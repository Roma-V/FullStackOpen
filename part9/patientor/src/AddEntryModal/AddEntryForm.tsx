import React, { useState } from "react";
import { Select, Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import {
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  EntryTypeOption,
  TextField,
  DiagnosisSelection,
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  HealthRatingSelectField, HealthRatingOption } from "../AddPatientModal/FormField";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Entry, EntryFormValues, HealthCheckRating } from "../types";
import { useStateValue } from '../state/state';

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

interface PropsWithType extends Props {
  type: Entry['type'];
}

const entryOptions: EntryTypeOption[] = [
  { key: 'Hospital', value: 'Hospital', text: 'Hospital' },
  { key: 'OccupationalHealthcare', value: 'OccupationalHealthcare', text: 'OccupationalHealthcare' },
  { key: 'HealthCheck', value: 'HealthCheck', text: 'HealthCheck' }
];

const ratingOptions: HealthRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" },
];

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const defaultType = 'HealthCheck';
  const [type, setType] = useState<Entry['type']>(defaultType);

  return (
    <div>
      <Select
        placeholder='Select entry type'
        options={entryOptions}
        defaultValue={defaultType}
        onChange={(event, data) => setType(data.value as Entry['type'])}
      />
      <TypeSpecificForm
        onSubmit={onSubmit}
        onCancel={onCancel}
        type={type}
      />
    </div>
  );
};


const TypeSpecificForm: React.FC<PropsWithType> = ({ onSubmit, onCancel, type }) => {
  switch (type) {
    case 'HealthCheck':
      return (
        <AddHealthCheckEntryForm
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      );
    case 'Hospital':
      return (
        <AddHospitalEntryForm
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      );
    case 'OccupationalHealthcare':
      return (
        <AddOccupationalHealthcareEntryForm
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      );
    default:
      return null;
  }
};

const AddHealthCheckEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: 'HealthCheck',
        description: '',
        date: new Date().toISOString().split('T')[0],
        specialist: '',
        healthCheckRating: HealthCheckRating.Healthy
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            {/* BaseEntry */}
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Array.from(diagnoses.values())}
              
            />
            {/* Typed Entries */}
            <HealthRatingSelectField
              label="Health rating"
              name="healthCheckRating"
              options={ratingOptions}
              
            />
            {/* Buttons */}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};


const AddHospitalEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: 'Hospital',
        description: '',
        date: new Date().toISOString().split('T')[0],
        specialist: '',
        discharge: {
          date: new Date().toISOString().split('T')[0],
          criteria: ''
        }
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            {/* BaseEntry */}
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Array.from(diagnoses.values())}
              
            />
            {/* Typed Entries */}
            <Field
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge criteria"
              placeholder="Discharge criteria"
              name="discharge.criteria"
              component={TextField}
            />
            {/* Buttons */}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

const AddOccupationalHealthcareEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "OccupationalHealthcare",
        description: '',
        date: new Date().toISOString().split('T')[0],
        specialist: '',
        employerName: '',
        sickLeave: {
            startDate: '',
            endDate: ''
          }
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            {/* BaseEntry */}
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Array.from(diagnoses.values())}
              
            />
            {/* Typed Entries */}
            <Field
              label="Employer name"
              placeholder="Employer name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sick leave start date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sick leave end date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
            {/* Buttons */}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;