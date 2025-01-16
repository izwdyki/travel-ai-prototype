import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Slider } from '@components/ui/slider';
import { Calendar } from '@components/ui/calendar';
import { Checkbox } from '@components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover';
import { MapPin, Calendar as CalendarIcon, Sun, Cloud, Users, Loader2 } from 'lucide-react';

const TourismPlatform = () => {
  const [userPreferences, setUserPreferences] = useState({
    budget: 50000,
    startDate: null,
    endDate: null,
    interests: []
  });

  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const experienceOptions = [
    { id: 'onsen', label: '温泉', emoji: '♨️' },
    { id: 'nature', label: '自然', emoji: '🏞️' },
    { id: 'food', label: 'グルメ', emoji: '🍱' },
    { id: 'culture', label: '文化体験', emoji: '🎎' },
    { id: 'sake', label: '酒造り', emoji: '🍶' },
    { id: 'festival', label: '祭り', emoji: '🏮' }
  ];

  const formatDate = (date) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const handlePreferenceChange = (field, value) => {
    setUserPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInterestToggle = (interestId) => {
    setUserPreferences(prev => {
      const currentInterests = prev.interests;
      return {
        ...prev,
        interests: currentInterests.includes(interestId)
          ? currentInterests.filter(id => id !== interestId)
          : [...currentInterests, interestId]
      };
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Here we would integrate with API
    setTimeout(() => {
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
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="mb-6">
        <CardHeader className="text-xl font-bold">旅行プラン作成</CardHeader>
        <CardContent>
          <div className="space-y-6">
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">出発日</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      {userPreferences.startDate ? (
                        formatDate(userPreferences.startDate)
                      ) : (
                        <span>日付を選択</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={userPreferences.startDate}
                      onSelect={(date) => handlePreferenceChange('startDate', date)}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="block mb-2">帰宅日</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      {userPreferences.endDate ? (
                        formatDate(userPreferences.endDate)
                      ) : (
                        <span>日付を選択</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={userPreferences.endDate}
                      onSelect={(date) => handlePreferenceChange('endDate', date)}
                      disabled={(date) => 
                        date < new Date() || 
                        (userPreferences.startDate && date < userPreferences.startDate)
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div>
              <label className="block mb-4">興味のある体験</label>
              <div className="grid grid-cols-2 gap-4">
                {experienceOptions.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <Checkbox
                      checked={userPreferences.interests.includes(option.id)}
                      onCheckedChange={() => handleInterestToggle(option.id)}
                    />
                    <span>{option.emoji} {option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button 
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  リアルタイム情報を検索中...
                </>
              ) : (
                'おすすめプランを検索'
              )}
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
                      <span key={i} className="inline-block bg-pink-100 text-purple-800 rounded-full px-3 py-1 text-sm mr-2">
                        {event}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-purple-600">
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
