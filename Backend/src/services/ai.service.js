const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 to 100 indicating how well the candidate's profile matches the job descriotion"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of onterviewer behind asking this questions"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc. ")
    })).describe("Technical questions that can be asked in the interview along with their intentions and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of onterviewer behind asking this questions"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc. ")
    })).describe("Behavioral questions that can be asked in the interview along with their intentions and how to answer them"),
    skillGaps: z.array(z.object({
        skills: z.string().describe("the skills which the candidate is lacking "),
        severity: z.enum(["low", "medium", "high"]).describe("the serverity of this skill gap ")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("the day number in the preparation plan, starting from 1 "),
        focus: z.string().describe("the main focus of this day in the preparation plan , e.g. data structure"),
        tasks: z.array(z.object()).describe("List of task to be done on this data"),
    })).describe("A day-wise prepration plan for the candidate to follow in ")

})
async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const promt = `Generate an interview report for a candidate with the following details: 
                    Resume: ${resume}
                    self Description: ${selfDescription}
                    job Description : ${jobDescription} `

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: promt,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: zodToJsonSchema(interviewReportSchema),

        }
    })
    return JSON.parse(response.text)
}

module.exports = generateInterviewReport