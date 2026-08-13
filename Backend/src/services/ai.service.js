const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

async function invokeGeminiAi() {
    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: "Hello, Gemini ! Explain what is interview ? "
    })
    console.log(response.text)
}
const interviewReportSchema = z.object({
    matchScore: z.number().description("A score between 0 to 100 indicating how well the candidate's profile matches the job descriotion"),
    technicalQuestions: z.array(z.object({
        question: z.string().description("The technical question can be asked in the interview"),
        intention: z.string().description("The intention of onterviewer behind asking this questions"),
        answer: z.string().description("How to answer this question, what points to cover, what approach to take etc. ")
    })).description("Technical questions that can be asked in the interview along with their intentions and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().description("The technical question can be asked in the interview"),
        intention: z.string().description("The intention of onterviewer behind asking this questions"),
        answer: z.string().description("How to answer this question, what points to cover, what approach to take etc. ")
    })).description("Behavioral questions that can be asked in the interview along with their intentions and how to answer them"),
    skillGaps: z.array(z.object({
        skills: z.string().description("the skills which the candidate is lacking "),
        severity: z.enum(["low", "medium", "high"]).description("the serverity of this skill gap ")
    })).description("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().description("the day number in the preparation plan, starting from 1 "),
        focus: z.string().description("the main focus of this day in the preparation plan , e.g. data structure"),
        tasks: z.array(z.object()).description("List of task to be done on this data"),
    })).description("A day-wise prepration plan for the candidate to follow in ")

})
async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const promt = ''

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "",
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: zodToJsonSchema(interviewReportSchema)
        }
    })
}

module.exports = invokeGeminiAi