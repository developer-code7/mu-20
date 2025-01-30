import { Calendar, Users, Clock } from 'lucide-react';
import { mockData } from '../../data/mockData';

const UpcomingChallenges = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Upcoming Challenges</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockData.challenges.map((challenge) => (
          <div key={challenge.id} className="bg-gray-800 rounded-lg border border-gray-700 p-6 hover:border-orange-500 transition-colors">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-white">{challenge.name}</h3>
              <Calendar className="h-5 w-5 text-orange-500" />
            </div>
            
            <div className="mt-4 space-y-3">
              <div className="flex items-center text-sm text-gray-400">
                <Users className="h-4 w-4 mr-2" />
                <span>20-30 participants</span>
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <Clock className="h-4 w-4 mr-2" />
                <span>Registration closes in 5 days</span>
              </div>
            </div>
            
            <button className="mt-4 w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors">
              Register Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingChallenges;