import { GetMediaQuery } from '../graphql/pages.generated'

export const mapDetailsDataToView = (data: GetMediaQuery) => {
  if (!data?.Media) {
    return null
  }

  const { bannerImage, title, seasonYear, description, episodes, duration } =
    data.Media

  return {
    bannerImage,
    title: title?.english,
    seasonYear,
    description: description
      ?.replace(/<\/?i>/, '') // description has html tags so removing the common ones
      .split('<br>'),
    episodes,
    duration: `${duration}m`,
  }
}
