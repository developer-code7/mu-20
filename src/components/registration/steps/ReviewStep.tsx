import React from "react";
import { mockData } from "../../../data/mockData";

interface ReviewStepProps {
  formData: {
    fullname: string;
    email: string;
    school_id: string;
    challenge_id: string;
    committee_preferences: { [key: string]: string[] };
    team_name: string;
    team_members: string[];
  };
}

const ReviewStep: React.FC<ReviewStepProps> = ({ formData }) => {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Review Your Information
        </h3>
        <dl className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-gray-500">Name:</dt>
            <dd className="text-sm text-gray-900 col-span-2">
              {formData.fullname}
            </dd>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-gray-500">Email:</dt>
            <dd className="text-sm text-gray-900 col-span-2">
              {formData.email}
            </dd>
          </div>
          {/* <div className="grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-gray-500">School:</dt>
            <dd className="text-sm text-gray-900 col-span-2">
              {mockData.schools.find(s => s.id === formData.school_id)?.name}
            </dd>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-gray-500">Challenge:</dt>
            <dd className="text-sm text-gray-900 col-span-2">
              {mockData.challenges.find(c => c.id === formData.challenge_id)?.name}
            </dd>
          </div> */}
          <div className="grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-gray-500">Team Name:</dt>
            <dd className="text-sm text-gray-900 col-span-2">
              {formData.team_name}
            </dd>
          </div>
        </dl>
      </div>

      {/* <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Committee Preferences</h3>
        {Object.entries(formData.committee_preferences).map(([committeeId, portfolioIds]) => {
          const committee = mockData.committees[formData.challenge_id]
            .find(c => c.id === committeeId);
          return (
            <div key={committeeId} className="mb-4">
              <h4 className="text-sm font-medium text-gray-900">{committee?.name}</h4>
              <ul className="ml-4 mt-1">
                {portfolioIds.map(portfolioId => {
                  const portfolio = committee?.portfolios.find(p => p.id === portfolioId);
                  return (
                    <li key={portfolioId} className="text-sm text-gray-600">
                      {portfolio?.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div> */}
      {/* 
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Team Members</h3>
        <ul className="space-y-2">
          {formData.team_members.map(memberId => {
            const member = mockData.schoolUsers[formData.school_id]?.find(u => u.id === memberId);
            return (
              <li key={memberId} className="text-sm text-gray-600">
                {member?.name} ({member?.email})
              </li>
            );
          })}
        </ul>
      </div> */}
    </div>
  );
};

export default ReviewStep;
