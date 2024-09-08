export type User = {
  id?: string
  username: string
  jobTitle: string
}

export type UserDBRecord = Omit<User, 'jobTitle'> & {
  job_title: string
}
