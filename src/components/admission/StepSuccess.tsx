import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle, Video, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

interface Props {
  planType: 'social' | 'premium' | 'urgente' | null;
  onFinish: () => void;
}

export function StepSuccess({ planType, onFinish }: Props) {
  const { t, i18n } = useTranslation();
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const locale = i18n.language === 'es' ? 'es-ES' : 'en-US';

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    let startOffset = 0;
    if (planType === 'premium') startOffset = 2;
    if (planType === 'social') startOffset = 5;

    for (let i = 0; i < 5; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + startOffset + i);
      if (planType !== 'urgente' && (d.getDay() === 0 || d.getDay() === 6)) {
        startOffset++;
        continue;
      }
      dates.push({
        id: i,
        day: d.toLocaleDateString(locale, { weekday: 'short' }),
        date: d.getDate(),
        month: d.toLocaleDateString(locale, { month: 'short' })
      });
    }
    return dates;
  };

  const availableDates = generateDates();
  const availableTimes = ['09:00', '10:30', '14:00', '16:30', '18:00'];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isConfirmed) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6 py-12"
      >
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900">{t('admission.success.confirmed_title')}</h2>
        <p className="text-lg text-slate-600 max-w-md mx-auto">
          {t('admission.success.confirmed_subtitle')}
        </p>
        
        <div className="bg-slate-50 rounded-2xl p-6 max-w-md mx-auto text-left space-y-4 border border-slate-200">
          <div className="flex items-center gap-3 text-slate-700">
            <Video className="w-5 h-5 text-blue-600" />
            <span>{t('admission.success.meet_link')}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-700">
            <Mail className="w-5 h-5 text-blue-600" />
            <span>{t('admission.success.calendar_invite')}</span>
          </div>
        </div>

        <button
          onClick={onFinish}
          className="mt-8 bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-full font-medium transition-colors"
        >
          {t('admission.success.back_home')}
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full mb-4">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">{t('admission.success.payment_success')}</h2>
        <p className="text-slate-500 mt-2">{t('admission.success.select_time')}</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4 text-slate-900 font-semibold">
          <CalendarIcon className="w-5 h-5 text-blue-600" />
          <h3>{t('admission.success.available_dates')}</h3>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {availableDates.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDate(d.id)}
              className={`p-3 rounded-xl border text-center transition-all ${
                selectedDate === d.id
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-blue-300'
              }`}
            >
              <div className="text-xs uppercase font-medium opacity-80">{d.day}</div>
              <div className="text-2xl font-bold my-1">{d.date}</div>
              <div className="text-xs capitalize opacity-80">{d.month}</div>
            </button>
          ))}
        </div>
      </div>

      {selectedDate !== null && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4 text-slate-900 font-semibold">
            <Clock className="w-5 h-5 text-blue-600" />
            <h3>{t('admission.success.available_times')}</h3>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            {availableTimes.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-2 px-4 rounded-xl border text-center font-medium transition-all ${
                  selectedTime === time
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-blue-300'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      <div className="pt-6 flex justify-end">
        <button
          onClick={() => setIsConfirmed(true)}
          disabled={selectedDate === null || selectedTime === null}
          className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-300 disabled:cursor-not-allowed text-slate-900 px-8 py-3 rounded-full font-medium transition-colors shadow-lg"
        >
          {t('admission.success.confirm_appointment')}
        </button>
      </div>
    </div>
  );
}
