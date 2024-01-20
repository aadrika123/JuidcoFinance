interface CandidateType {
  id: string,
  name: string,
  skills: string | string[],
  experience: string,
  profilePic?: string
}

export type { CandidateType }