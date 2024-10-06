export function getTagColor(color: string): string {
  switch (color) {
    case 'blue':
      return 'text-white bg-blue-600';
    case 'purple':
      return 'text-white bg-purple-600';
    case 'red':
      return 'text-white bg-red-600';
    case 'orange':
      return 'text-white bg-orange-700';
    case 'green':
      return 'text-white bg-green-700';
    default:
      return 'text-white bg-gray-600';
  }
}

export function getTagCardBorderColor(color: string): string {
  switch (color) {
    case 'blue':
      return 'border-blue-500';
    case 'purple':
      return 'border-purple-500';
    case 'red':
      return 'border-red-500';
    case 'orange':
      return 'border-orange-500';
    case 'green':
      return 'border-green-500';
    default:
      return 'border-gray-500';
  }
}
