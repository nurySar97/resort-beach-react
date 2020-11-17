import React, { Component } from 'react'
import items from './data.js';
const RoomContext = React.createContext(null);
class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true
    };
    componentDidMount() {
        let rooms = this.formatData(items)
        let featuredRooms = rooms.filter(room => room.featured);
        this.Tout = setTimeout(() => {
            this.setState({
                rooms,
                featuredRooms,
                sortedRooms: rooms,
                loading: false
            })
        }, 1000)
    }
    componentWillUnmount() {
        clearTimeout(this.Tout)
    }
    getRoom = slug => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find(room => room.slug === slug)
        return room
    }
    formatData(items) {
        let tempItems = items.map(item => {
            let id = item.sys.id
            let images = item.fields.images.map(image => image.fields.file.url);
            let room = { ...item.fields, images, id }
            return room
        })
        return tempItems
    }
    render() {
        return <RoomContext.Provider value={{ ...this.state, getRoom: this.getRoom }}>
            {this.props.children}
        </RoomContext.Provider>
    }
}


const RoomConsumer = RoomContext.Consumer;


export const withRoomConsumer = Component => {
    return props => {
        return (
            <RoomConsumer>
                {value => <Component {...props} context={value} />}
            </RoomConsumer>
        )
    }
}

export { RoomProvider, RoomConsumer, RoomContext }