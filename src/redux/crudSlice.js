import { createSlice } from '@reduxjs/toolkit'



export const mainState = createSlice({
    name: 'jobTracker',
    initialState: {
        heading: "Job Tracker",
        initialList: [
            {
                company: "",
                link: "",
                role: "",
                contact: {
                    name: "",
                    email: "",
                    phone: ""
                },
                applyDate: "",
                response: ["None", "Positive email", "Positive phone call", "Rejected"],
                interviewStage: ["None", "1st Face-to-face", "2nd Face-to-face", "3rd Face-to-face", "4th Face-to-face", "Interview Declined"],
                interviewTimeDate: "",
                offer: "",
                followUpDate: "",
            }
        ],
        list: [],
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
        showModal: false,
        currentIndex: 0,
        addOrEdit: "",//the edit and add button will be the same button, so we need to know if we are adding or editing
    },

    //All state values/functions are written/handled here
    reducers: {
        showModal: (state, action) => {
            state.showModal = action.payload
        },
        loadLists: (state, action) => {
            console.log('jobList', JSON.parse(localStorage.getItem('jobList')))// returns the array of objects
            state.list = localStorage.getItem('jobList') ? JSON.parse(localStorage.getItem('jobList')) : [];
            console.log('state.list: ',state.list)
        },
        getIndex: (state, action) => {
          state.currentIndex = action.payload
        },
        inputComponyName: (state, action) => {
            state.captureInput.company = action.payload
        },
        inputLink: (state, action) => {
            state.captureInput.link = action.payload
        },
        inputRole: (state, action) => {
            state.captureInput.role = action.payload
        },

        //Contact:
        inputContactName: (state, action) => {
            console.log('action', action)
            state.captureInput.contact.name = action.payload;
        },
        inputContactEmail: (state, action) => {
            state.captureInput.contact.email = action.payload
        },
        inputContactPhone: (state, action) => {
            state.captureInput.contact.phone = action.payload
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
            console.log('action.payload', action.payload)
        },
        inputFollowUpDate: (state, action) => {
            state.captureInput.followUpDate = action.payload
            console.log('state.captureInput.followUpDate = action.payload', state.captureInput.followUpDate = action.payload)
        },
        fillFields: (state, action) => {
            console.log('action', action)
            // when the modal opens, set the initial state of captureInput to the item that needs to be updated
            if (action.payload !== "Add") {
                const index = action.payload; // Get the index of the item in the array that needs to be updated
                state.captureInput = { ...state.list[index] }; // Assign values from state.list[index] to state.captureInput
               
            }
        },
        addNew: (state, action) => {
            console.log('adding')
            state.addOrEdit = "adding"
         
            //state.captureInput = { ...state.list[0] }
            localStorage.setItem('jobList', JSON.stringify(state.list))
        },
        update: (state, action) => {
            state.addOrEdit = "editing"
            const index = state.currentIndex; 
          
            if (state.addOrEdit === "editing") {
                state.list[index] = { ...state.captureInput }; // Assign values from state.captureInput to state.list[index]
                localStorage.setItem('jobList', JSON.stringify(state.list)) // Update localStorage
            }
          
        },
        deleteCard: (state, action) => {
            const index = action.payload; // Get the index of the item in the array that needs to be deleted
            state.list.splice(index, 1); // Remove the item from the array

            localStorage.setItem('jobList', JSON.stringify(state.list)) // Update localStorage
        }
    },
})



// Action creators are generated for each case reducer function


export const {
    initialState,
    showModal,
    getIndex,
    loadLists,
    addOrEditBtn,
    fillFields,
    inputComponyName,
    update,
    inputLink,
    inputRole,
    inputContactName,
    inputContactEmail,
    inputContactPhone, 
    inputApplyDate, 
    inputResponse, 
    inputInterviewStage, 
    inputInterviewTimeDate, 
    inputOffer, 
    inputFollowUpDate, 
    addNew,
    deleteCard

} = mainState.actions


export default mainState.reducer

