export type User = {
  id?: string
  username: string
  jobTitle: string
}

export type UserDBRecord = Omit<Required<User>, 'jobTitle'> & {
  job_title: string
}
