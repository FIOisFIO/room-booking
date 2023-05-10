import React, { useEffect, useState } from 'react'
import { mockApi } from '../../mock-api/mock-api';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function FloorSelector({ floor, setFloor, tower, error }) {

    const [floors, setFloors] = useState([]);
    const floorChange = (event) => {
        setFloor(event.target.value);
    }

    useEffect(() => {
        if (!tower) {
            setFloors([]);
            return;
        }

        mockApi.getFloors().then((res) => {
            setFloor('');
            setFloors(res);
        })
    }, [tower]);

    return (
        <FormControl className="custom-input">
            <InputLabel id='floor-select-label'>Этаж</InputLabel>
            <Select
                error={error}
                id='floor-select'
                labelId="floor-select-label"
                value={floor}
                label='Этаж'
                onChange={floorChange}
                disabled={!tower}
            >
                {floors.map((menuItem) => {
                    return <MenuItem key={menuItem.id} value={menuItem.id}>{menuItem.name}</MenuItem>
                })}

            </Select>
        </FormControl>
    )
}
