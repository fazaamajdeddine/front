export const formatDate = (date: string) => {
  const newDate = new Date(date);
  const day = newDate.getDate().toString().padStart(2, '0');
  const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
  const year = newDate.getFullYear().toString();

  return `${day}-${month}-${year}`;
}

export enum Gender {
  Male = "Male",
  Female = "Female",
}

export enum Preferences {
  Adventure = "Adventure",
  Fantasy = "Fantasy",
  ScienceFiction = "Science Fiction",
  Mystery = "Mystery",
  Friendship = "Friendship",
}


//  a helper function to map categories to their respective colors
export const getCategoryColor = (category: Preferences): string => {
  switch (category) {
    case Preferences.Adventure:
      return "#75B936";
    case Preferences.Fantasy:
      return "#D6F0E4";
    case Preferences.ScienceFiction:
      return "#F5C65E";
    case Preferences.Mystery:
      return "#82B2B0";
    case Preferences.Friendship:
      return "#F6E49F";
    default:
      return "#FFFFFF"; // Default color if the category is not found
  }
};
