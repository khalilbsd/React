import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { action__get__posts } from '../../actions/action__posts';
import { action__post__meetings } from '../../actions/action__meetings';
import { useParams } from "react-router-dom";

export default function EventMarketplace({ _id }) {
    let { id } = useParams(); //this is the event id passed as a param in the url

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(action__get__posts());
    }, [dispatch]);

    const store__posts = useSelector((state) => state.reducer__posts);

    const [newMeeting, setNewMeeting] = useState({
        event_id: id,
        party_one_id: _id,
        party_two_id: "",
    });

    useEffect(() => {
        if (newMeeting.party_two_id) {
            dispatch(action__post__meetings(newMeeting)).then(setNewMeeting({
                ...newMeeting,
                party_two_id: "",
                unique_id: ""
            }));
            console.log("meeting request sent");
        }
    }, [newMeeting.party_two_id]);


    return (
        <div>
            <p>EventMarketplace</p>
            {
                store__posts.map((post, key) => (
                    post.place_id == id ? (
                        post.account == _id ? (
                            null
                        ) : (
                            < button onClick={() => {
                                setNewMeeting({
                                    ...newMeeting,
                                    party_two_id: post.account,
                                    unique_id: id + _id + post.account,
                                })
                            }}>Request Meeting</button>
                        )
                    ) : (
                        null
                    )
                ))
            }
        </div >
    );
}





