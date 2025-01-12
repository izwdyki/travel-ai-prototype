'use client'
import { useState } from 'react';
import { Calendar, MapPin, Wallet } from 'lucide-react';

const TravelPlanner = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    budget: 100000,
    duration: 2,
    interests: []
  });

  const recommendations = [
    {
      title: "伝統工芸体験と地酒を楽しむ贅沢な2日間",
      image: "/api/placeholder/600/400",
      location: "新潟県燕市",
      description: "伝統的な金属加工の技術を体験し、地元の酒蔵で試飲を楽しむプラン",
      weather: "晴れ - 21℃",
      events: ["つばめ物づくりフェア", "酒蔵開放デー"],
      price: ""
    },
    {
      title: "山間の秘湯と郷土料理の探訪",
      image: "/api/placeholder/600/400",
      location: "島根県奥出雲町",
      description: "たたら製鉄の歴史を学び、地元の方と郷土料理作りを体験",
      weather: "曇り - 19℃",
      events: ["たたら操業実演", "奥出雲そば祭り"],
      price: ""
    },
    {
      title: "海女文化と真珠養殖体験の旅",
      image: "/api/placeholder/600/400",
      location: "三重県鳥羽市",
      description: "現役の海女さんから話を聞き、真珠養殖場で海の恵みを学ぶ。新鮮な海産物を使った郷土料理も堪能。",
      weather: "晴れ - 24℃",
      events: ["海女文化体験", "真珠養殖見学会"],
      price: ""
    },
    {
      title: "山形の老舗酒蔵と果樹園めぐり",
      image: "/api/placeholder/600/400",
      location: "山形県天童市",
      description: "200年以上の歴史を持つ酒蔵での特別試飲会と、果樹園でのもぎ取り体験。",
      weather: "晴れ - 18℃",
      events: ["酒蔵開放デー", "さくらんぼ狩り"],
      price: ""
    }
  ];

  const interests = [
    "伝統工芸", "郷土料理", "祭り", "温泉", "地酒",
    "自然", "歴史", "アート", "建築", "農業体験"
  ];

  const renderStep1 = () => (
    <div className="p-6 space-y-8">
      <div className="space-y-4">
        <label className="text-lg font-medium flex items-center gap-2">
          <Wallet className="w-5 h-5 text-red-600" />
          <span className="text-red-600">予算設定</span>
        </label>
        <div className="space-y-4">
          <input
            type="range"
            min="50000"
            max="500000"
            step="10000"
            value={formData.budget}
            onChange={(e) => setFormData({...formData, budget: Number(e.target.value)})}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
          />
          <div className="text-center text-red-600 font-medium">
            {(formData.budget / 10000).toFixed(1)}万円
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-lg font-medium flex items-center gap-2">
          <Calendar className="w-5 h-5 text-red-600" />
          <span className="text-red-600">旅行日数</span>
        </label>
        <div className="space-y-4">
          <input
            type="range"
            min="1"
            max="10"
            value={formData.duration}
            onChange={(e) => setFormData({...formData, duration: Number(e.target.value)})}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
          />
          <div className="text-center text-red-600 font-medium">
            {formData.duration}日間
          </div>
        </div>
      </div>

      <button 
        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
        onClick={() => setStep(2)}
      >
        次へ進む
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        <label className="text-lg font-medium">興味のある体験（複数選択可）</label>
        <div className="grid grid-cols-2 gap-3">
          {interests.map((interest) => (
            <button
              key={interest}
              className={`
                text-sm border-2 rounded-lg py-2 px-4 transition-colors
                ${formData.interests.includes(interest) 
                  ? 'bg-red-600 text-white border-red-600' 
                  : 'text-red-600 border-red-600 hover:bg-red-50'}
              `}
              onClick={() => {
                const newInterests = formData.interests.includes(interest)
                  ? formData.interests.filter(i => i !== interest)
                  : [...formData.interests, interest];
                setFormData({...formData, interests: newInterests});
              }}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button 
          onClick={() => setStep(1)}
          className="border-2 border-red-600 text-red-600 hover:bg-red-50 py-2 px-4 rounded-lg transition-colors"
        >
          戻る
        </button>
        <button 
          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
          onClick={() => setStep(3)}
          disabled={formData.interests.length === 0}
        >
          プランを探す
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="p-6 space-y-6">
      <div className="text-sm text-gray-600 mb-4">
        あなたの条件に合わせて、以下のプランをご提案します
      </div>
      
      {recommendations.map((rec, index) => (
        <div key={index} className="mb-6 bg-white rounded-lg overflow-hidden shadow-lg border-2 border-gray-100 hover:border-red-100 transition-all">
          <div className="p-6">
            <div className="space-y-2 mb-4">
              <h3 className="text-xl font-bold text-gray-800">{rec.title}</h3>
              <img src={rec.image} alt={rec.title} className="w-full h-48 object-cover rounded-lg mt-2" />
              <div className="flex items-center gap-1 text-gray-600">
                <MapPin className="w-4 h-4" />
                {rec.location}
              </div>
            </div>
            <p className="text-gray-600 mb-4">{rec.description}</p>
            <div className="space-y-2">
              <div className="text-sm text-gray-500">
                現在の天候: <span className="text-gray-700">{rec.weather}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">開催中のイベント:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {rec.events.map((event, i) => (
                    <span key={i} className="bg-red-50 text-red-600 px-2 py-1 rounded-full text-xs">
                      {event}
                    </span>
                  ))}
                </div>
              </div>

            </div>
            <button 
              className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              詳細を見る
            </button>
          </div>
        </div>
      ))}

      <button 
        onClick={() => setStep(1)}
        className="w-full border-2 border-red-600 text-red-600 hover:bg-red-50 py-2 px-4 rounded-lg transition-colors"
      >
        条件を変更する
      </button>
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="border-b border-gray-100 p-6">
        <div className="flex items-center gap-2">
          <div className="bg-red-600 text-white p-2 rounded-full">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">新しい旅の発見</h2>
            <p className="text-gray-600">
              あなたの興味に合わせて、ユニークな旅行体験をご提案します
            </p>
          </div>
        </div>
      </div>

      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </div>
  );
};

export default TravelPlanner;
