import React, { Component } from 'react'
import items from './data.js';
const RoomContext = React.createContext(null);

class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    };
    componentDidMount() {
        let rooms = this.formatData(items)
        let featuredRooms = rooms.filter(room => room.featured);
        let maxPrice = Math.max(...rooms.map(item => {
            return item.price
        }))
        let maxSize = Math.max(...rooms.map(item => {
            return item.size
        }))
        this.Tout = setTimeout(() => {
            this.setState({
                rooms,
                featuredRooms,
                sortedRooms: rooms,
                loading: false,
                price: maxPrice,
                maxPrice,
                maxSize
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
    handleChange = event => {
        const target = event.target
        const value = event.type === 'checkbox'
            ? target.checked : target.value
        const name = event.target.name
        this.setState({
            [name]: value
        }, this.filterRooms)
    }

    filterRooms = props => {
        let {
            rooms, type, capacity, price, minSize, maxSize, breakfast, pets
        } = this.state
        // all the rooms
        let tempRooms = [...rooms];
        // transform value
        capacity =parseInt(capacity)
        // filter by type
        if(type !== 'all'){
            tempRooms = tempRooms.filter(room=>room.type === type)
        }
        // filter by capacity

        if(capacity !== 1){
            tempRooms = tempRooms.filter(room=>room.capacity >= capacity)
        }
        this.setState({
            sortedRooms: tempRooms
        })
    }
    render() {
        return <RoomContext.Provider
            value={{
                ...this.state,
                getRoom: this.getRoom,
                handleChange: this.handleChange
            }}>
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