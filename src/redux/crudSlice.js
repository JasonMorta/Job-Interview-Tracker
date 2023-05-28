import { createSlice } from '@reduxjs/toolkit'



export const mainState = createSlice({
    name: 'jobTracker',
    initialState: {
        heading: "Job Tracker",
        list: [
            {
                company: "Job 1",
                link: "I&J",
                role: "Full Stack Developer",
                contact: {
                    name: "John Doe",
                    email: "123@gmail.com",
                    phone: "123-456-7890"
                },
                applyDate: "2021-01-01",
                response: ["Positive email", "Positive phone call", "Rejected"],
                interviewStage: ["1st Face-to-face", "2nd Face-to-face", "3rd Face-to-face", "4th Face-to-face", "Interview Declined"],
                interviewTimeDate: "12:00PM Wed Feb 10, 2021",
                offer: ["Offer Accepted", "Offer Declined", "Offer Pending"],
                followUpDate: "Wed Feb 17, 2021",






            }
        ],
        captureInput: {
            company: "", 
            link: "", 
            role: "", 
            contact: { 
                name: "", 
                email: "", 
                phone: "" 
            }, 
            applyDate: "", 
            response: "", 
            interviewStage: "", 
            interviewTimeDate: "", 
            offer: "", 
            followUpDate: ""
        },
        isAdding: false,
    },

    //All state values/functions are written/handled here
    reducers: {
        inputComponyName: (state, action) => {
            console.log('action', action)
            //state.captureInput.company = action.payload
        },
        inputLink: (state, action) => {
            state.captureInput.link = action.payload
        },
        inputRoleName: (state, action) => {
            state.captureInput.contact.name = action.payload
        },
        inputContactEmail: (state, action) => {
            state.captureInput.contact.email = action.payload
        },
        inputContactPhone: (state, action) => {
            state.captureInput.contact.phone = action.payload
        },
        inputContact: (state, action) => {
            //state.captureInput.contact.name = action.payload
        },
        inputApplyDate: (state, action) => {
            state.captureInput.applyDate = action.payload
        }, 
        inputResponse: (state, action) => {
            state.captureInput.response = action.payload
        },
        inputInterviewStage: (state, action) => {
            state.captureInput.interviewStage = action.payload
        },
        inputInterviewTimeDate: (state, action) => {
            state.captureInput.interviewTimeDate = action.payload
        },
        inputOffer: (state, action) => {
            state.captureInput.offer = action.payload
        },
        inputFollowUpDate: (state, action) => {
            state.captureInput.followUpDate = action.payload
        },
        addNew: (state, action) => {
            state.list.push(action.payload)
        }
        
    },
})



// Action creators are generated for each case reducer function
  

export const { initialState, inputComponyName, inputLink, inputRole, inputContactName , inputContactEmail, inputContactPhone, inputApplyDate, inputResponse, inputInterviewStage,  inputInterviewTimeDate, inputOffer, inputFollowUpDate, addNew } = mainState.actions

export default mainState.reducer

