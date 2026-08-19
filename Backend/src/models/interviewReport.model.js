const mongoose = require("mongoose");

/**
 * job description schema : String
 * resume text : String
 * Self description : String
 * 
 * matchScore : Number
 * 
 * Technikal questions :[{ question: "", intention: "", answer: "" }]
 * Beahavioral questions : [{ question: "", intention: "", answer: "" }]
 * Skills gaps : [{ skill: "", severity : "", type: "", enum: ["technical", "behavioral"] }]
 * presentation plan : [{day: Number, focus: string, task: [string]}]
 */

const technicalQuestionsSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    intention: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
}, {
    _id: false
});

const behavioralQuestionsSchema = new mongoose.Schema({
    question:
    {
        type: String,
        required: true
    },
    intention:
    {
        type: String,
        required: true
    },
    answer:
    {
        type: String,
        required: true
    }
}, {
    _id: false
});

const skillsGapsSchema = new mongoose.Schema({
    skill:
    {
        type: String,
        required: [true, "Skill is required"]

    },
    severity:
    {
        type: String,
        enum: ["low", "medium", "high"],
        required: [true, "Severity is required"]
    },
}, {
    _id: false
});

const presentationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, "Day is required"]
    },
    focus: {
        type: String,
        required: [true, "Focus is required"]
    },
    task: [
        {
            type: String,
            required: [true, "Task is required"]
        }
    ]
});

const interviewReportSchema = new mongoose.Schema(
    {
        jobDescription: { type: String, required: true },
        resumeText: { type: String },
        selfDescription: { type: String },
        matchScore: { type: Number, min: 0, max: 100 },
        technicalQuestions: [technicalQuestionsSchema],
        behavioralQuestions: [behavioralQuestionsSchema],
        skillsGaps: [skillsGapsSchema],
        presentationPlan: [presentationPlanSchema],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    }, {
    timestamps: true
})

const interviewReportModel = mongoose.model("InterviewReport", interviewReportSchema);

module.exports = interviewReportModel;