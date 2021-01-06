/**
 * @file A page with patient details
 * @author Roman Vasilyev
 */

import React from "react";
import axios from "axios";
import { Icon, Button } from "semantic-ui-react";

import { useParams } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Patient, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientDetails } from "../state";

import EntryRecord from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";

/*
 * use type Entry, but omit id,
 * because those are irrelevant for new entry object.
 */
export type EntryFormValues = Omit<Entry, "id">;


const PatientDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const patient = patients[id];
  
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const detailsNotFetched = () => !patient || !patient.ssn || ! patient.entries;
  
  React.useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const { data: patientDetailsFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatientDetails(patientDetailsFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    if (detailsNotFetched()) fetchPatientDetails();
  }, [dispatch]);

  if (detailsNotFetched()) return null;

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      const updatedPatient = patients[id];
      updatedPatient.entries.push(newEntry);
      dispatch(setPatientDetails(updatedPatient));
      closeModal();
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.error(e.response.data);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      setError(e.response.data.error);
    }
  };

  return (
    <div className="App">
      <h3>
          {patient.name}
          <Icon name={patient.gender === 'male' ? 'mars' : 'venus'} />
      </h3>
      <div>SSN: {patient.ssn}</div>
      <div>Occupation: {patient.occupation}</div>
      <h4>
        {"Entries "}
        <Button onClick={() => openModal()} icon size='mini'>
          <Icon name='plus' />
        </Button>
      </h4>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      {patient.entries
        .map(entry => <EntryRecord entry={entry} key={entry.id} />)
      }
    </div>
  );
};

export default PatientDetailsPage;
