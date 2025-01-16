import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { MapPin, Calendar, Sun, Cloud, Users } from 'lucide-react';

const TourismPlatform = () => {
  const [userPreferences, setUserPreferences] = useState({
    budget: 50000,
    duration: 3,
    interests: '',
    startDate: '',
  });

  const [recommendations, setRecommendations] = useState([]);

  const handlePreferenceChange = (field, value) => {
    setUserPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    // Here we would integrate with Dify API
    // For prototype, using dummy data
    setRecommendations([
      {
        location: "富良野",
        weather: "晴れ",
        events: ["ラベンダーフェスティバル"],
        rating: 4.5,
        reviews: 120,
        matchScore: 92
      },
      {
        location: "別府",
        weather: "曇り",
        events: ["温泉まつり"],
        rating: 4.3,
        reviews: 89,
        matchScore: 85
      }
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="mb-6">
        <CardHeader className="text-xl font-bold">旅行プラン作成</CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">予算（円）</label>
              <Slider
                value={[userPreferences.budget]}
                onValueChange={([value]) => handlePreferenceChange('budget', value)}
                max={200000}
                step={1000}
                className="w-full"
              />
              <div className="text-right">{userPreferences.budget.toLocaleString()}円</div>
            </div>

            <div>
              <label className="block mb-2">旅行日数</label>
              <Slider
                value={[userPreferences.duration]}
                onValueChange={([value]) => handlePreferenceChange('duration', value)}
                max={14}
                step={1}
                className="w-full"
              />
              <div className="text-right">{userPreferences.duration}日間</div>
            </div>

            <div>
              <label className="block mb-2">興味・関心</label>
              <Input
                type="text"
                value={userPreferences.interests}
                onChange={(e) => handlePreferenceChange('interests', e.target.value)}
                placeholder="例：温泉、グルメ、アウトドア"
                className="w-full"
              />
            </div>

            <div>
              <label className="block mb-2">出発希望日</label>
              <Input
                type="date"
                value={userPreferences.startDate}
                onChange={(e) => handlePreferenceChange('startDate', e.target.value)}
                className="w-full"
              />
            </div>

            <Button 
              onClick={handleSubmit}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              おすすめプランを検索
            </Button>
          </div>
        </CardContent>
      </Card>

      {recommendations.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">おすすめの旅行先</h2>
          {recommendations.map((rec, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold flex items-center">
                    <MapPin className="mr-2" size={20} />
                    {rec.location}
                  </h3>
                  <div className="flex items-center mt-2">
                    {rec.weather === "晴れ" ? 
                      <Sun className="mr-2" size={16} /> : 
                      <Cloud className="mr-2" size={16} />
                    }
                    {rec.weather}
                  </div>
                  <div className="mt-2">
                    {rec.events.map((event, i) => (
                      <span key={i} className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm mr-2">
                        {event}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">
                    マッチ度: {rec.matchScore}%
                  </div>
                  <div className="flex items-center mt-2 text-gray-600">
                    <Users className="mr-1" size={16} />
                    <span>{rec.reviews} レビュー</span>
                  </div>
                  <div className="mt-2">
                    ⭐️ {rec.rating}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TourismPlatform;
