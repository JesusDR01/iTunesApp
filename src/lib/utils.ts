export const formatPrice = (num?: number) => {
  if (!num) return ""
  if (num >= 10000 && num < 1000000) {
    return Math.floor(num / 1000) * 1000
  } else if (num >= 1000000) {
    return Math.floor(num / 10000) * 10000
  }
  return num.toFixed()
}

export const formatRelease = (date: string) => {
  const previousDate = new Date(date) 
  const timeDifference = Date.now() - new Date(date).getTime()
  const daysDifference = timeDifference / (1000 * 3600 * 24)
  const hoursDifference = timeDifference / (1000 * 3600)
  if (daysDifference < 1){
    if (hoursDifference < 1){
      const minutesDifference = timeDifference / (1000 * 60)
      if (minutesDifference < 1){
        return 'Just now'
      }
      const rtf2 = new Intl.RelativeTimeFormat('en', { style: 'long' });
      return rtf2.format(-parseInt(minutesDifference.toFixed(0)), 'minute');
    }
    const rtf1 = new Intl.RelativeTimeFormat('en', { style: 'long' });
    const hourFormat = rtf1.format(-parseInt(hoursDifference.toFixed(0)), 'hour')
    if (hourFormat === '1 hour ago') return 'an hour ago'
    return rtf1.format(-parseInt(hoursDifference.toFixed(0)), 'hour')
  }else if (daysDifference < 7) {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
    const isDateFromLastWeek = previousDate >= oneWeekAgo && previousDate < new Date();
    if (isDateFromLastWeek) {
      const formatter = new Intl.DateTimeFormat('en-US', { weekday: 'long' });
      const dayOfWeek = formatter.format(previousDate);
      return `Last ${dayOfWeek}`;
    }
  } else if (daysDifference < 365) {
    // show: 21/Jun | 22/Jun | 23/Jun | ...
    const rtf3 = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' });
    return rtf3.format(new Date(date)).replace(' ', '/');
  } else{
    // show 31/12/2022 | 31/12/2023 | 31/12/2024 | ...
    return new Date(date).toLocaleDateString()
  }
}