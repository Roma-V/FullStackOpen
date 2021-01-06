/**
 * @file A view with entry details
 * @author Roman Vasilyev
 */

import React from "react";
import axios from "axios";
import { Icon, Message } from "semantic-ui-react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry, Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setDiagnosesList } from "../state";

const EntryRecord: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }, dispatch] = useStateValue();

  const diagnosesNotFetched = () => diagnoses.size === 0;

  React.useEffect(() => {
    const fetchDiagnoses = async () => {
        try {
          const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(
            `${apiBaseUrl}/diagnoses`
          );
        //   console.log('fetched', diagnoses);
          dispatch(setDiagnosesList(diagnosesFromApi));
        } catch (e) {
          console.error(e);
        }
      };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    if (diagnosesNotFetched()) fetchDiagnoses();
  }, [dispatch]);

  let icon;
  switch (entry.type) {
    case "Hospital":
        icon = 'hospital';
        break;
    case "OccupationalHealthcare": 
        icon = 'stethoscope';
        break;
    case "HealthCheck":
        icon = 'user md';
        break;
    default:
        icon = 'plus';
  }

  return (
    <Message icon floating>
      <Icon name={icon} />
      <Message.Content>
      <Message.Header>{entry.date}{" - "}{entry.specialist}</Message.Header>
      <div><i style={{color: "gray"}}>{entry.description}</i></div>
      {
          entry.diagnosisCodes?.map(
                  code => 
                  <li key={code}>
                      {code}{" - "}
                      {diagnoses.get(code)?.name}
                  </li>
              )
      }
      <TypedEntry entry={entry} />
      </Message.Content>
      
    </Message>
  );
};


/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const TypedEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case "Hospital":
            return <HospitalEntryRecord entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntryRecord entry={entry} />;
        case "HealthCheck": 
            return <HealthCheckEntryRecord entry={entry} />;
        default:
            return assertNever(entry);
    }
};

const HospitalEntryRecord: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {  
    return (
      <div>
        {entry.discharge?.date} - {entry.discharge?.criteria}
      </div>
    );
};

const OccupationalHealthcareEntryRecord: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {  
    return (
      <div>
        {entry.employerName}{": "} 
        {
            entry.sickLeave
                ? entry.sickLeave.startDate + " - " + entry.sickLeave.endDate
                : 'NA'
        }
      </div>
    );
};

const HealthCheckEntryRecord: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => { 
    const rating = parseInt(entry.healthCheckRating);
    switch (rating) {
        case 0:
            return <Icon name='heart' color='green' />;
        case 1:
            return <Icon name='heart' color='yellow' />;
        case 2: 
            return  <Icon name='heart' color='orange' />;
        case 3: 
            return  <Icon name='heart' color='red' />;
        default:
            return null;
    }
};

export default EntryRecord;
