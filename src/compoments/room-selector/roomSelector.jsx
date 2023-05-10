import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { mockApi } from '../../mock-api/mock-api';

export default function RoomSelector({ tower, floor, room, setRoom, className, error }) {
    const [rooms, setRooms] = useState([]);
    const roomChange = (event) => {
        setRoom(event.target.value);
    }

    useEffect(() => {
        if (!tower || !floor) {
            setRooms([]);
            return;
        }

        mockApi.getRooms(tower, floor).then((res) => {
            setRoom('');
            setRooms(res);
        });
    }, [tower, floor]);

    return (
        <FormControl className={className}>
            <InputLabel id='room-select-label'>Комната</InputLabel>
            <Select
                error={error}
                labelId="room-select-label"
                id="demo-simple-select"
                value={room}
                label="Комната"
                onChange={roomChange}
                disabled={!floor}
            >
                {rooms.map((menuItem) => {
                    return <MenuItem key={menuItem.id} value={menuItem.id}>{menuItem.name}</MenuItem>
                })}

            </Select>
        </FormControl>
    )
}
