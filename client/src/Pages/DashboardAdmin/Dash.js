import React from 'react';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {action__get__accounts} from '../../actions/action__accounts';
import {action__patch__accounts} from '../../actions/action__accounts';
import {action__get__participants} from '../../actions/action__participants';
import {action__patch__participants} from '../../actions/action__participants';
import {action__post__events} from '../../actions/action__events';
import {action__get__events} from '../../actions/action__events';
import {action__patch__events} from '../../actions/action__events';

export default function DashboardAdmin() {

    const dispatch = useDispatch();
    //account
    useEffect(() => {
        dispatch(action__get__accounts());
    }, [dispatch]);

    const store__accounts = useSelector((state) => state.reducer__accounts);

    const [updatedAccount, setUpdatedAccount] = useState({verified_by_admin: ""});

    const [accountId, setAccountId] = useState("");

    useEffect(() => {
        if (updatedAccount.verified_by_admin && accountId) {
            dispatch(action__patch__accounts(accountId, updatedAccount)).then(
                setUpdatedAccount({
                    ...updatedAccount,
                    verified_by_admin: "", //this is used to reset, why? cause when you click on one you can't click on another, look at the dispatch condition and you'll get it
                })
            );
        }
    }, [accountId, updatedAccount.verified_by_admin]);

    //participant

    useEffect(() => {
        dispatch(action__get__participants());
    }, [dispatch]);

    const store__participants = useSelector((state) => state.reducer__participants);

    const [updatedParticipant, setUpdatedParticipant] = useState(
        {verified_by_admin: ""}
    );

    const [participantId, setParticipantId] = useState("");

    useEffect(() => {
        if (updatedParticipant.verified_by_admin && participantId) {
            dispatch(action__patch__participants(participantId, updatedParticipant)).then(
                setUpdatedParticipant({
                    ...updatedParticipant,
                    verified_by_admin: "", //this is used to reset, why? cause when you click on one you can't click on another, look at the dispatch condition and you'll get it
                })
            );
        }
    }, [participantId, updatedParticipant.verified_by_admin]);

    //events create
    const [newEvent, setNewEvent] = useState({
        title: "",
        start_date: "",
        end_date: "",
        location: "",
        industrial_sector: "",
        description: "",
        image: ""
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(action__post__events(newEvent));
    }
    //display
    useEffect(() => {
        dispatch(action__get__events());
    }, [dispatch]);

    const store__events = useSelector((state) => state.reducer__events);

    //delete
    const [deletedEvent, setDeletedEvent] = useState({state: ""});
    const [eventId, setEventId] = useState("");

    useEffect(() => {
        if (eventId && deletedEvent.state) {
            dispatch(action__patch__events(eventId, deletedEvent)).then(setDeletedEvent({
                ...deletedEvent,
                state: ""
            }), setEventId(""));
        }
    }, [eventId, deletedEvent.state]);

    //update

    const [updatedEvent, setUpdatedEvent] = useState({
        _id: "",
        title: "",
        start_date: "",
        end_date: "",
        location: "",
        industrial_sector: "",
        description: "",
        image: ""
    });

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(action__patch__events(updatedEvent._id, updatedEvent));
    }
    //
    return (
        <div>
            <p>DashboardAdmin</p>
            <br/>
            <p>Validate/Delete Accounts</p>
            {
                store__accounts.map((account, key) => (
                    account.verified_by_admin === "false"
                        ? (
                            <div>
                                <button
                                    onClick={() => {
                                        setUpdatedAccount({
                                            ...updatedAccount,
                                            verified_by_admin: "true"
                                        });
                                        setAccountId(account._id);
                                    }}>Unvalidate Account</button>
                                <br/>
                            </div>
                        )
                        : (
                            <div>
                                <button
                                    onClick={() => {
                                        setUpdatedAccount({
                                            ...updatedAccount,
                                            verified_by_admin: "false"
                                        });
                                        setAccountId(account._id);
                                    }}>Unvalidate Account</button>
                                <br/>
                            </div>
                        )
                ))
            }
            <br/>
            <p>Validate/Delete Participants</p>
            {
                store__participants.map((participant, key) => (
                    participant.verified_by_admin === "false"
                        ? (
                            <div>
                                <button
                                    onClick={() => {
                                        setUpdatedParticipant({
                                            ...updatedParticipant,
                                            verified_by_admin: "true"
                                        });
                                        setParticipantId(participant._id);
                                    }}>Validate Participant</button>
                                <br/>
                            </div>
                        )
                        : (
                            <div>
                                <button
                                    onClick={() => {
                                        setUpdatedParticipant({
                                            ...updatedParticipant,
                                            verified_by_admin: "false"
                                        });
                                        setParticipantId(participant._id);
                                    }}>Unvalidate Participant</button>
                                <br/>
                            </div>
                        )
                ))
            }
            <br/>
            <p>CRUD Events</p>
            <br/>
            <p>Create Events</p>
            <br/>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        onChange={(e) => {
                            setNewEvent({
                                ...newEvent,
                                title: e.target.value
                            });
                        }}/>
                </label>
                <label>
                    Start Date
                    <input
                        type="text"
                        name="start_date"
                        onChange={(e) => {
                            setNewEvent({
                                ...newEvent,
                                start_date: e.target.value
                            });
                        }}/>
                </label>
                <label>
                    End Date
                    <input
                        type="text"
                        name="end_date"
                        onChange={(e) => {
                            setNewEvent({
                                ...newEvent,
                                end_date: e.target.value
                            });
                        }}/>
                </label>
                <label>
                    Location
                    <input
                        type="text"
                        name="location"
                        onChange={(e) => {
                            setNewEvent({
                                ...newEvent,
                                location: e.target.value
                            });
                        }}/>
                </label>
                <label>
                    Industrial Sector
                    <input
                        type="text"
                        name="industrial_sector"
                        onChange={(e) => {
                            setNewEvent({
                                ...newEvent,
                                industrial_sector: e.target.value
                            });
                        }}/>
                </label>
                <label>
                    Description
                    <input
                        type="text"
                        name="description"
                        onChange={(e) => {
                            setNewEvent({
                                ...newEvent,
                                description: e.target.value
                            });
                        }}/>
                </label>
                <label>
                    Image
                    <input
                        type="text"
                        name="image"
                        onChange={(e) => {
                            setNewEvent({
                                ...newEvent,
                                image: e.target.value
                            });
                        }}/>
                </label>

                <input type="submit" value="Submit"/>
            </form>
            <br/>
            <p>Get Events + Deactivate Events + Update Events</p>
            {
                store__events.map((event, key) => (
                    event.state == "true"
                        ? (
                            <div>
                                <button
                                    onClick={() => {
                                        setDeletedEvent({
                                            ...deletedEvent,
                                            state: "false"
                                        });
                                        setEventId(event._id);
                                    }}>Deactivate Event</button>
                                <button
                                    onClick={() => {
                                        setUpdatedEvent({
                                            _id: event._id,
                                            title: event.title,
                                            start_date: event.start_date,
                                            end_date: event.end_date,
                                            location: event.location,
                                            industrial_sector: event.industrial_sector,
                                            description: event.description,
                                            image: event.image
                                        })
                                    }}>Open Modal</button>
                                {/*begin torture*/}
                                <form>

                                    <label>
                                        Title:
                                        <input
                                            type="text"
                                            name="title"
                                            defaultValue={event.title}
                                            onChange={(e) => {
                                                setUpdatedEvent({
                                                    ...updatedEvent,
                                                    title: e.target.value
                                                });
                                            }}/>
                                    </label>
                                    <label>
                                        Start Date
                                        <input
                                            type="text"
                                            name="start_date"
                                            defaultValue={event.start_date}
                                            onChange={(e) => {
                                                setUpdatedEvent({
                                                    ...updatedEvent,
                                                    start_date: e.target.value
                                                });
                                            }}/>
                                    </label>
                                    <label>
                                        End Date
                                        <input
                                            type="text"
                                            name="end_date"
                                            defaultValue={event.end_date}
                                            onChange={(e) => {
                                                setUpdatedEvent({
                                                    ...updatedEvent,
                                                    end_date: e.target.value
                                                });
                                            }}/>
                                    </label>
                                    <label>
                                        Location
                                        <input
                                            type="text"
                                            name="location"
                                            defaultValue={event.location}
                                            onChange={(e) => {
                                                setUpdatedEvent({
                                                    ...updatedEvent,
                                                    location: e.target.value
                                                });
                                            }}/>
                                    </label>
                                    <label>
                                        Industrial Sector
                                        <input
                                            type="text"
                                            name="industrial_sector"
                                            defaultValue={event.industrial_sector}
                                            onChange={(e) => {
                                                setUpdatedEvent({
                                                    ...updatedEvent,
                                                    industrial_sector: e.target.value
                                                });
                                            }}/>
                                    </label>
                                    <label>
                                        Description
                                        <input
                                            type="text"
                                            name="description"
                                            defaultValue={event.description}
                                            onChange={(e) => {
                                                setUpdatedEvent({
                                                    ...updatedEvent,
                                                    description: e.target.value
                                                });
                                            }}/>
                                    </label>
                                    <label>
                                        Image
                                        <input
                                            type="text"
                                            name="image"
                                            defaultValue={event.image}
                                            onChange={(e) => {
                                                setUpdatedEvent({
                                                    ...updatedEvent,
                                                    image: e.target.value
                                                });
                                            }}/>
                                    </label>
                                    <button onClick={handleUpdate}>Update</button>
                                </form>

                                <br/> {/*//end torture*/}
                            </div>
                        )
                        : (
                            <div>
                                <button
                                    onClick={() => {
                                        setDeletedEvent({
                                            ...deletedEvent,
                                            state: "true"
                                        });
                                        setEventId(event._id);
                                    }}>Activate Event</button>
                                <br/>
                            </div>
                        )

                ))
            }
        </div >
    );
}
