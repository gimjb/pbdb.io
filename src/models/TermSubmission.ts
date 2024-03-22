import mongoose from 'mongoose'

/** A suggested definition of a theological term. */
export interface TermSubmission {
  /** The Discord user ID of the author of the submission. */
  author: string
  /** The name of the term. */
  title: string
  /** The suggested definition of the term. */
  description: string
  /** The date and time the definition was submitted. */
  date: Date
}

/** A suggested definition of a theological term. */
export interface TermModel extends mongoose.Model<TermSubmission> {
  /**
   * Gets all term submissions by a given author.
   *
   * @param author The Discord user ID of the author.
   * @returns A promise that resolves to an array of term submissions.
   */
  getByAuthor: (author: string) => Promise<mongoose.QueryWithHelpers<TermSubmission[], TermSubmission>>
}

const termSubmissionSchema = new mongoose.Schema<TermSubmission, TermModel>({
  author: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: () => new Date() }
})

termSubmissionSchema.static('getByAuthor', async function (author: string) {
  return await this.find({ author })
})

/** A suggested definition of a theological term. */
export default mongoose.model<TermSubmission, TermModel>('TermSubmission', termSubmissionSchema)
