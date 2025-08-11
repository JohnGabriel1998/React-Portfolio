import { useTranslation } from 'react-i18next';
import { ScrollTimeline, TimelineEvent } from '../components/ScrollTimeline';

const Education = () => {
  const { t } = useTranslation();

  // Convert your existing education data to TimelineEvent format
  const educationEvents: TimelineEvent[] = [
    {
      id: 'highschool',
      year: t('education.highschool.duration'),
      title: t('education.highschool.title'),
      subtitle: t('education.highschool.institution'),
      description: t('education.highschool.description'),
    },
    {
      id: 'japanese',
      year: t('education.japanese.duration'),
      title: t('education.japanese.title'),
      subtitle: t('education.japanese.institution'),
      description: t('education.japanese.description'),
      website: t('education.japanese.website'),
    },
    {
      id: 'internship',
      year: t('education.internship.duration'),
      title: t('education.internship.title'),
      subtitle: t('education.internship.institution'),
      description: t('education.internship.description'),
      website: t('education.internship.website'),
    },
    {
      id: 'globalit',
      year: t('education.globalit.duration'),
      title: t('education.globalit.title'),
      subtitle: t('education.globalit.institution'),
      description: t('education.globalit.description'),
      website: t('education.globalit.website'),
    },
  ];

  return (
    <section id="education" className="py-16 sm:py-20 md:py-24 lg:py-32">
      <ScrollTimeline
        events={educationEvents}
        title={t('education.title')}
        subtitle="Scroll to explore my educational journey"
        cardAlignment="alternating"
        progressIndicator={true}
        cardVariant="elevated"
        cardEffect="shadow"
        parallaxIntensity={0.05}
        progressLineWidth={2}
        progressLineCap="round"
        dateFormat="badge"
        revealAnimation="slide"
        connectorStyle="line"
        perspective={false}
        className="min-h-screen"
      />
    </section>
  );
};

export default Education;