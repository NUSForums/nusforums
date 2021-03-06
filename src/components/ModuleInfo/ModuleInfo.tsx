import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import Item from './Item';
import { NUSMOD_API } from '../../config/constants';
import { NUSModules } from '../../types/modules';
import Exam from './Exam';
import Information from './Information';

type Props = {
  moduleCode?: string;
};

const defaultData: NUSModules = {
  acadYear: '2021/2022',
  preclusion:
    'EEE and CPE students can only take this module as a technical elective to satisfy the program requirements or UEM but not CFM/ULR-Breadth.',
  description:
    "This module introduces different techniques of designing and analysing algorithms. Students will learn about the framework for algorithm analysis, for example, lower bound arguments, average case analysis, and the theory of NP-completeness. In addition, students are exposed to various algorithm design paradigms. The module serves two purposes: to improve the students' ability to design algorithms in different areas, and to prepare students for the study of more advanced algorithms. The module covers lower and upper bounds, recurrences, basic algorithm paradigms (such as prune-and-search, dynamic programming, branch-and-bound, graph traversal, and randomised approaches), amortized analysis, NP-completeness, and some selected advanced topics.",
  title: 'Design and Analysis of Algorithms',
  department: 'Computer Science',
  faculty: 'Computing',
  workload: [2, 1, 0, 3, 3],
  prerequisite:
    '((CS2010 or its equivalent) or CS2020 or (CS2040 or its equivalent)) and (MA1100 or (CS1231 or its equivalent))',
  moduleCredit: '4',
  moduleCode: 'CS3230',
  attributes: {
    mpes1: true,
    mpes2: true,
  },
  semesterData: [
    {
      semester: 1,
      timetable: [
        {
          classNo: '06',
          startTime: '1600',
          endTime: '1700',
          weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          venue: 'E-Learn_C',
          day: 'Monday',
          lessonType: 'Tutorial',
          size: 24,
          covidZone: 'Unknown',
        },
        {
          classNo: '04',
          startTime: '1400',
          endTime: '1500',
          weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          venue: 'E-Learn_C',
          day: 'Wednesday',
          lessonType: 'Tutorial',
          size: 24,
          covidZone: 'Unknown',
        },
        {
          classNo: '01',
          startTime: '0800',
          endTime: '0900',
          weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          venue: 'E-Learn_C',
          day: 'Monday',
          lessonType: 'Tutorial',
          size: 24,
          covidZone: 'Unknown',
        },
        {
          classNo: '1',
          startTime: '1000',
          endTime: '1200',
          weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          venue: 'E-Learn_C',
          day: 'Tuesday',
          lessonType: 'Lecture',
          size: 360,
          covidZone: 'Unknown',
        },
        {
          classNo: '09',
          startTime: '1000',
          endTime: '1100',
          weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          venue: 'E-Learn_C',
          day: 'Wednesday',
          lessonType: 'Tutorial',
          size: 24,
          covidZone: 'Unknown',
        },
        {
          classNo: '07',
          startTime: '0900',
          endTime: '1000',
          weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          venue: 'E-Learn_C',
          day: 'Thursday',
          lessonType: 'Tutorial',
          size: 24,
          covidZone: 'Unknown',
        },
        {
          classNo: '12',
          startTime: '1300',
          endTime: '1400',
          weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          venue: 'E-Learn_C',
          day: 'Wednesday',
          lessonType: 'Tutorial',
          size: 24,
          covidZone: 'Unknown',
        },
        {
          classNo: '14',
          startTime: '1700',
          endTime: '1800',
          weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          venue: 'E-Learn_C',
          day: 'Friday',
          lessonType: 'Tutorial',
          size: 24,
          covidZone: 'Unknown',
        },
        {
          classNo: '05',
          startTime: '1500',
          endTime: '1600',
          weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          venue: 'E-Learn_C',
          day: 'Monday',
          lessonType: 'Tutorial',
          size: 24,
          covidZone: 'Unknown',
        },
        {
          classNo: '10',
          startTime: '1300',
          endTime: '1400',
          weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          venue: 'E-Learn_C',
          day: 'Monday',
          lessonType: 'Tutorial',
          size: 24,
          covidZone: 'Unknown',
        },
        {
          classNo: '08',
          startTime: '1200',
          endTime: '1300',
          weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          venue: 'E-Learn_C',
          day: 'Wednesday',
          lessonType: 'Tutorial',
          size: 24,
          covidZone: 'Unknown',
        },
        {
          classNo: '13',
          startTime: '1600',
          endTime: '1700',
          weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          venue: 'E-Learn_C',
          day: 'Friday',
          lessonType: 'Tutorial',
          size: 24,
          covidZone: 'Unknown',
        },
        {
          classNo: '11',
          startTime: '0900',
          endTime: '1000',
          weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          venue: 'E-Learn_C',
          day: 'Wednesday',
          lessonType: 'Tutorial',
          size: 24,
          covidZone: 'Unknown',
        },
        {
          classNo: '03',
          startTime: '1830',
          endTime: '1930',
          weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          venue: 'E-Learn_C',
          day: 'Wednesday',
          lessonType: 'Tutorial',
          size: 24,
          covidZone: 'Unknown',
        },
        {
          classNo: '02',
          startTime: '1100',
          endTime: '1200',
          weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          venue: 'E-Learn_C',
          day: 'Wednesday',
          lessonType: 'Tutorial',
          size: 24,
          covidZone: 'Unknown',
        },
      ],
      covidZones: ['Unknown'],
      examDate: '2021-12-01T09:00:00.000Z',
      examDuration: 150,
    },
    {
      semester: 2,
      timetable: [
        {
          classNo: '09',
          startTime: '1900',
          endTime: '2000',
          weeks: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          venue: 'E-Learn_C',
          day: 'Tuesday',
          lessonType: 'Tutorial',
          size: 23,
          covidZone: 'Unknown',
        },
        {
          classNo: '12',
          startTime: '1200',
          endTime: '1300',
          weeks: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          venue: 'SR_LT19',
          day: 'Wednesday',
          lessonType: 'Tutorial',
          size: 23,
          covidZone: 'B',
        },
        {
          classNo: '14',
          startTime: '1400',
          endTime: '1500',
          weeks: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          venue: 'SR_LT19',
          day: 'Wednesday',
          lessonType: 'Tutorial',
          size: 23,
          covidZone: 'B',
        },
        {
          classNo: '06',
          startTime: '1000',
          endTime: '1100',
          weeks: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          venue: 'SR_LT19',
          day: 'Tuesday',
          lessonType: 'Tutorial',
          size: 23,
          covidZone: 'B',
        },
        {
          classNo: '05',
          startTime: '0900',
          endTime: '1000',
          weeks: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          venue: 'SR_LT19',
          day: 'Tuesday',
          lessonType: 'Tutorial',
          size: 23,
          covidZone: 'B',
        },
        {
          classNo: '04',
          startTime: '1400',
          endTime: '1500',
          weeks: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          venue: 'E-Learn_C',
          day: 'Monday',
          lessonType: 'Tutorial',
          size: 23,
          covidZone: 'Unknown',
        },
        {
          classNo: '10',
          startTime: '1000',
          endTime: '1100',
          weeks: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          venue: 'SR_LT19',
          day: 'Wednesday',
          lessonType: 'Tutorial',
          size: 23,
          covidZone: 'B',
        },
        {
          classNo: '11',
          startTime: '1100',
          endTime: '1200',
          weeks: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          venue: 'SR_LT19',
          day: 'Wednesday',
          lessonType: 'Tutorial',
          size: 23,
          covidZone: 'B',
        },
        {
          classNo: '15',
          startTime: '1500',
          endTime: '1600',
          weeks: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          venue: 'SR_LT19',
          day: 'Wednesday',
          lessonType: 'Tutorial',
          size: 23,
          covidZone: 'B',
        },
        {
          classNo: '16',
          startTime: '1900',
          endTime: '2000',
          weeks: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          venue: 'E-Learn_C',
          day: 'Wednesday',
          lessonType: 'Tutorial',
          size: 23,
          covidZone: 'Unknown',
        },
        {
          classNo: '03',
          startTime: '1300',
          endTime: '1400',
          weeks: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          venue: 'E-Learn_C',
          day: 'Monday',
          lessonType: 'Tutorial',
          size: 23,
          covidZone: 'Unknown',
        },
        {
          classNo: '08',
          startTime: '1200',
          endTime: '1300',
          weeks: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          venue: 'E-Learn_C',
          day: 'Tuesday',
          lessonType: 'Tutorial',
          size: 23,
          covidZone: 'Unknown',
        },
        {
          classNo: '17',
          startTime: '1100',
          endTime: '1200',
          weeks: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          venue: 'SR_LT19',
          day: 'Friday',
          lessonType: 'Tutorial',
          size: 23,
          covidZone: 'B',
        },
        {
          classNo: '18',
          startTime: '1200',
          endTime: '1300',
          weeks: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          venue: 'SR_LT19',
          day: 'Friday',
          lessonType: 'Tutorial',
          size: 23,
          covidZone: 'B',
        },
        {
          classNo: '13',
          startTime: '1300',
          endTime: '1400',
          weeks: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          venue: 'SR_LT19',
          day: 'Wednesday',
          lessonType: 'Tutorial',
          size: 23,
          covidZone: 'B',
        },
        {
          classNo: '1',
          startTime: '1400',
          endTime: '1600',
          weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          venue: 'E-Learn_C',
          day: 'Thursday',
          lessonType: 'Lecture',
          size: 420,
          covidZone: 'Unknown',
        },
        {
          classNo: '01',
          startTime: '1100',
          endTime: '1200',
          weeks: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          venue: 'E-Learn_C',
          day: 'Monday',
          lessonType: 'Tutorial',
          size: 23,
          covidZone: 'Unknown',
        },
        {
          classNo: '07',
          startTime: '1100',
          endTime: '1200',
          weeks: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          venue: 'E-Learn_C',
          day: 'Tuesday',
          lessonType: 'Tutorial',
          size: 23,
          covidZone: 'Unknown',
        },
        {
          classNo: '02',
          startTime: '1200',
          endTime: '1300',
          weeks: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          venue: 'E-Learn_C',
          day: 'Monday',
          lessonType: 'Tutorial',
          size: 23,
          covidZone: 'Unknown',
        },
      ],
      covidZones: ['Unknown', 'B'],
      examDate: '2022-04-26T09:00:00.000Z',
      examDuration: 120,
    },
  ],
  prereqTree: {
    and: [
      {
        or: ['CS2010', 'CS2020', 'CS2040'],
      },
      {
        or: ['MA1100', 'CS1231'],
      },
    ],
  },
  fulfillRequirements: [
    'CS4231',
    'CS4235',
    'CS5234',
    'CS5237',
    'CS5238',
    'CS6244',
    'CS6210',
    'CS6281',
    'CS5330',
    'CS4234',
    'CS6215',
    'CS4257',
    'CS4268',
    'CS6235',
    'CS5562',
  ],
};

const ModuleInfo = ({ moduleCode }: Props) => {
  const acadYear = useAppSelector((state) => state.metadata.acadYear);
  const semester = useAppSelector((state) => state.metadata.semester);

  const [moduleInfo, setModuleInfo] = useState<NUSModules>(defaultData);
  const examDate = moduleInfo?.semesterData.filter((x) => x.semester === semester)[0]?.examDate;

  useEffect(() => {
    if (!!moduleCode) {
      axios.get(`${NUSMOD_API}/${acadYear}/modules/${moduleCode}.json`).then((res) => {
        setModuleInfo(res.data);
      });
    }
  }, [acadYear, moduleCode]);

  return (
    <div className="px-5 pt-2 pb-4 bg-white rounded-lg shadow-post">
      <Information content={moduleInfo?.description} />
      <Item heading="Prerequisite" content={moduleInfo?.prerequisite} />
      <Item heading="Preclusion" content={moduleInfo?.preclusion} />
      <Exam date={examDate} />
    </div>
  );
};

export default ModuleInfo;
