import React from 'react';
import RoomsFilter from './RoomsFilter';
import RoomsList from './RoomsList';
import { withRoomConsumer } from '../context';
import Loading from './Loading';



const RoomsContainer = ({context,Muha}) => {
    const { loading, sortedRooms, rooms } = context
    if (loading) {
        return <Loading />
    }
    return (
        <div>
            Hello From Rooms Container
            <RoomsFilter rooms={rooms} />
            <RoomsList rooms={sortedRooms} />
        </div>
    )
}

export default withRoomConsumer(RoomsContainer)