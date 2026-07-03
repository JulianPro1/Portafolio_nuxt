export const useAnimation = () => {
  const animationClasses = {
    title: 'animate-slide-fade-up',
    desc: 'animate-slide-fade-up',
    card: 'animate-scale-fade-in',
    cta: 'animate-slide-fade-up',
    tab: 'animate-slide-fade-right',
    carouselCard: 'animate-stagger-card',
  };

  const getStaggerDelay = (index: number, baseDelay: number = 100): string => {
    return `${baseDelay + (index * 60)}ms`;
  };

  const getDelayForVariant = (variant: string): number => {
    const delays: Record<string, number> = {
      title: 300,
      desc: 400,
      card: 500,
      cta: 600,
      tab: 280,
      carouselCard: 450,
    };
    return delays[variant] || 0;
  };

  return {
    animationClasses,
    getStaggerDelay,
    getDelayForVariant,
  };
};
