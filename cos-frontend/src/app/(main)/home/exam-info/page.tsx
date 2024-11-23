'use client';

import { format } from 'date-fns';
import Link from 'next/link';
import * as React from 'react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import Header from '@/components/common/Header';
import ExamInfoItem from '@/components/home/ExamInfoItem';
import useGetCertificationInfo from '@/lib/hooks/useGetCertificationInfo';
import { certificationInfoState } from '@/recoil/home/atom';
import { CertificateInfoType } from '@/types/home/type';
import { commonTitle } from '@/utils/exam-info/CommonTitle';

const ExamInfo = () => {
  // 데이터 패칭
  const { certificationInfo } = useGetCertificationInfo();
  const [data, setData] = useRecoilState(certificationInfoState);

  /**
   * Recoil 상태를 초기화하는 함수
   * @param apiResponse certificationInfo.result
   */
  const initializeCertificationInfoState = (apiResponse: CertificateInfoType) => {
    return {
      certificate: {
        certificateId: apiResponse.certificate.certificateId,
        certificateName: apiResponse.certificate.certificateName,
      },
      examInfo: {
        examYear: apiResponse.examInfo.examYear,
        round: apiResponse.examInfo.round,
        examSchedule: {
          applicationStartDateTime:
            '• 접수 시작 : ' + format(apiResponse.examInfo.examSchedule.applicationStartDateTime, 'yyyy.MM.dd'),
          applicationDeadlineDateTime:
            '• 접수 종료 : ' + format(apiResponse.examInfo.examSchedule.applicationDeadlineDateTime, 'yyyy.MM.dd'),
          resultAnnouncementDateTime:
            '• 합격 발표 : ' + format(apiResponse.examInfo.examSchedule.resultAnnouncementDateTime, 'yyyy.MM.dd'),
          examDateTime: '• 시험 날짜 : ' + format(apiResponse.examInfo.examSchedule.examDateTime, 'yyyy.MM.dd'),
        },
        examFee: {
          writtenExamFee: apiResponse.examInfo.examFee.writtenExamFee,
          practicalExamFee: apiResponse.examInfo.examFee.practicalExamFee,
        },
        examTimeLimit: {
          writtenExamTimeLimit: apiResponse.examInfo.examTimeLimit.writtenExamTimeLimit,
          practicalExamTimeLimit: apiResponse.examInfo.examTimeLimit.practicalExamTimeLimit,
        },
        passingCriteria: {
          subjectPassingCriteria: apiResponse.examInfo.passingCriteria.subjectPassingCriteria,
          totalAvgCriteria: apiResponse.examInfo.passingCriteria.totalAvgCriteria,
          practicalPassingCriteria: apiResponse.examInfo.passingCriteria.practicalPassingCriteria,
        },
        subjectsInfo: apiResponse.examInfo.subjectsInfo,
        description: apiResponse.examInfo.description,
        examFormat: apiResponse.examInfo.examFormat,
        examEligibility: apiResponse.examInfo.examEligibility,
      },
    };
  };

  /**
   * API 에서 데이터를 가져와 Recoil 상태 업데이트 해주는 함수
   */
  const fetchDataAndUpdateState = async () => {
    try {
      const response = certificationInfo;
      if (response) {
        const initialState: CertificateInfoType = initializeCertificationInfoState(response.result);
        setData(initialState);
      } else {
        // 에러 처리를 수행할 수 있습니다.
        console.error('Failed to fetch goal setting data');
      }
    } catch (error) {
      // 네트워크 오류 또는 다른 예외에 대한 처리를 수행할 수 있습니다.
      console.error('Error fetching goal setting data:', error);
    }
  };

  // 컴포넌트가 마운트될 때 데이터 가져오기
  useEffect(() => {
    fetchDataAndUpdateState();
  }, [certificationInfo]);

  /**
   * 접수하기 버튼
   */
  const registerCertificateButton = () => {
    return (
      <Link
        href={'https://www.pct.or.kr/sub.html?page=apply_intro'}
        className={'flex items-center bg-primary text-white py-1 px-3 rounded-full text-h6'}>
        접수하기
        <Icon />
      </Link>
    );
  };

  /**
   * 공통 컴포넌트 내용 가공
   */
  const renderElement = (content: string) => {
    switch (content) {
      case 'description':
        return <div className="text-h4">{data.examInfo.description}</div>;
      case 'examFee':
        return (
          <div className="flex flex-col text-h4">
            {Object.entries(data.examInfo.examFee).map(([key, value]) => {
              return (
                <div key={key}>
                  • {key === 'writtenExamFee' ? '필기 :' : '실기 :'} {value}원
                </div>
              );
            })}
          </div>
        );
      case 'examSchedule':
        return (
          <div>
            {Object.entries(data.examInfo.examSchedule).map(([key, value]) => {
              return <div key={key}>{value}</div>;
            })}
          </div>
        );
      case 'subjectsInfo':
        return <div>{data.examInfo.subjectsInfo}</div>;
      case 'examFormat':
        return <div>{data.examInfo.examFormat}</div>;
      case 'examEligibility':
        return <div>{data.examInfo.examEligibility}</div>;
      case 'examTimeLimit':
        return (
          <div>
            {Object.entries(data.examInfo.examTimeLimit).map(([key, value]) => {
              return (
                <div key={key}>
                  • {key === 'writtenExamTimeLimit' ? '필기 :' : '실기 :'} {value}분
                </div>
              );
            })}
          </div>
        );
      case 'passingCriteria':
        return (
          <div>
            {Object.entries(data.examInfo.passingCriteria).map(([key, value]) => {
              return (
                <div key={key}>
                  {' '}
                  •{' '}
                  {key === 'subjectPassingCriteria'
                    ? '과목당 '
                    : key === 'practicalPassingCriteria'
                    ? ' 실기 '
                    : '전과목 '}{' '}
                  {value}점 이상
                </div>
              );
            })}
          </div>
        );
      default:
        return <div></div>;
    }
  };

  return (
    <div className="bg-gray0 min-h-screen">
      <Header headerType={'dynamic'} title={'응시정보'} rightElement={registerCertificateButton()}></Header>
      <div className="flex flex-col gap-y-5 m-5 mt-4">
        {Object.entries(commonTitle).map(([key, value]) => {
          return <ExamInfoItem key={key} Icon={value.Icon} title={value.title} element={renderElement(key)} />;
        })}
      </div>
      <div className={'h-[50px]'} />
    </div>
  );
};
export default ExamInfo;

function Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={16} height={17} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M5 11.5l6-6M5 5.5h6v6" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
