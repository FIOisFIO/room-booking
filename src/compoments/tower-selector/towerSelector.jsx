import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { mockApi } from '../../mock-api/mock-api';

export default function TowerSelector({ tower, setTower, error }) {

    const [towers, setTowers] = useState([]);
    const towerChange = (event) => {
        setTower(event.target.value);
    }

    useEffect(() => {
        mockApi.getTowers().then((res) => setTowers(res))
    }, []);

    return (
        <FormControl className="custom-input">
            <InputLabel id='tower-select-label'>Башня</InputLabel>
            <Select
                error={error}
                id='tower-select'
                labelId="tower-select-label"
                value={tower}
                label='Башня'
                onChange={towerChange}
            >
                {towers.map((menuItem) => {
                    return <MenuItem key={menuItem.id} value={menuItem.id}>{menuItem.name}</MenuItem>
                })}

            </Select>
        </FormControl>
    )
}
