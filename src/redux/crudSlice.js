import { async } from '@firebase/util';
import { createSlice } from '@reduxjs/toolkit'
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../config/firebase";


export const mainState = createSlice({
    name: 'jobTracker',
    initialState: {
        heading: "Job Tracker",
        initialList: [
            {
                company: "",
                location: "",
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
                userID: ""
            }
        ],
        list: [],
        captureInput: {
            company: "",
            location: "",
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
            followUpDate: "",
            userID: ""
        },
        showModal: false,
        currentIndex: 0,
        currentID: "",
        addOrEdit: "",//the edit and add button will be the same button, so we need to know if we are adding or editing
        isLoggedIn: false,
        isLoading: false,
    },

    //All state values/functions are written/handled here
    reducers: {
        isLoggedIn: (state, action) => {
            console.log(`%c logged in slice`, 'color: #2196f3')
            state.isLoggedIn = action.payload
            console.log('isLoggedIn', action.payload)
            let loggedIn = action.payload
            if (loggedIn) {
                state.list = []
                //state.captureInput = {}
            }
        },
        showModal: (state, action) => {
            console.log(`%c showModal`, 'color: #90e0ef')
            console.log('action.payload[0] : ', action.payload)
            console.log('action.payload.length', action.payload.length)

            if (action.payload.length > 1) { //if the modal is closed, save the data to local storage

                state.addOrEdit = action?.payload[1] // = adding
                // When adding a new item, clear the input fields
                if (action?.payload[1] === 'adding') {
                    state.captureInput = {
                        company: "",
                        link: "",
                        location: "",
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
                        followUpDate: "",
                        userID: auth.currentUser.uid,
                    }
                } else {
                    state.captureInput = state.list[action?.payload[2]]
                }

            }

            state.showModal = action.payload[0] // show modal

        },
        loadLists: (state, action) => {
            console.log(`%c loadLists`, 'color: #ef233c')
            console.log('action.payload', action)
            //state.list = localStorage.getItem('jobList') ? JSON.parse(localStorage.getItem('jobList')) : [];

            //The data seems to load twice or more times,
            //The first time it loads, it has the data, but the second time it loads, it is empty
            if (action.payload?.length > 0) {
                state.list = action.payload
                state.isLoggedIn = true
                state.isLoading = false
            } else {
                state.list = []
            }
        },
        getIndex: (state, action) => {
            state.currentIndex = action.payload
        },
        loading: (state, action) => {
            state.isLoading = action.payload
        },
        inputComponyName: (state, action) => {
            state.captureInput.company = action.payload
        },
        inputLocation: (state, action) => {
            state.captureInput.location = action.payload
        },
        inputLink: (state, action) => {
            state.captureInput.link = action.payload
        },
        inputRole: (state, action) => {
            state.captureInput.role = action.payload
        },
        inputContactName: (state, action) => {//Contact:
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
        },
        inputFollowUpDate: (state, action) => {
            state.captureInput.followUpDate = action.payload
        },
        fillFields: (state, action) => {
            console.log(`%c fillFields`, 'color: #2196f3')
            // when the modal opens, set the initial state of captureInput to the item that needs to be updated
            if (action.payload !== "Add") {
                const index = action.payload; // Get the index of the item in the array that needs to be updated
                state.captureInput = { ...state.list[index] }; // Assign values from state.list[index] to state.captureInput

            }
        },
        addNew: (state, action) => {
            console.log(`%c addNew`, 'color: #2196f3')
            state.addOrEdit = "adding"
            state.list.push(state.captureInput)

            //Store to firebase
            console.log('auth.currentUser', auth.currentUser)
            async function getList() {
                try {
                    if (auth.currentUser) {

                        state.captureInput.userID = auth.currentUser.uid//include the user id in the object

                        // Create the Firestore document
                        await addDoc(collection(db, "jobList"), state.captureInput);
                        //console.log("Document created with ID: ", docRef.id);
                        console.log(`%c Added to db`, 'color: limegreen')
                    }
                    // Update state or perform any other actions
                    //localStorage.setItem('jobList', JSON.stringify(state.list))
                } catch (error) {
                    console.error("Error creating document: ", error);
                    console.log(`%c NOT Added to db`, 'color: red')
                }
            } getList()
        },
        editExisting: (state, action) => {
            console.log(`%c editExisting`, 'color: #2196f3')
            state.addOrEdit = "editing"
            //const index = action.payload; // Get the index of the item in the array that needs to be updated
            //state.captureInput = { ...state.list[index] }; // Assign values from state.list[index] to state.captureInput
        },
        update: (state, action) => {
            console.log(`%c update`, 'color: #2196f3')
            const index = state.currentIndex;

            console.log('ID', state.currentID)

            state.list[index] = { ...state.captureInput }; // Assign values from state.captureInput to state.list[index]
            //localStorage.setItem('jobList', JSON.stringify(state.list)) // Update localStorage

            async function updateList() {
                try {
                    const item = doc(db, "jobList", state.currentID); // Create a reference to the specific track document

                    await updateDoc(item, state.list[index]); // Update the document with the new data from the state
                    console.log("card updated");
                } catch (error) {
                    console.log(error);
                    console.log("card NOT updated");
                }
            } updateList()

        },
        deleteCard: (state, action) => {
            //const id = action?.payload; // Get the index of the item in the array that needs to be deleted

            state.list.splice(state.currentIndex, 1); // Remove the item from the array
            //console.log('id', id)


            //localStorage.setItem('jobList', JSON.stringify(state.list)) // Update localStorage



        },
        getCardID: (state, action) => {
            console.log(`%c getCardID`, 'color: #2196f3')
            state.currentID = action.payload

        }
    },
})



// Action creators are generated for each case reducer function


export const {
    initialState,
    showModal,
    inputLocation,
    getIndex,
    isLoggedIn,
    loadLists,
    addOrEditBtn,
    loading,
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
    getCardID,
    inputFollowUpDate,
    addNew,
    deleteCard,
    editExisting

} = mainState.actions


export default mainState.reducer

