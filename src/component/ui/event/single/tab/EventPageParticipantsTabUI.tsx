import React, {FC, useEffect, useState} from 'react';
import {TabPanel} from "@mui/lab";
import {Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import {useLazyGetUserByIdQuery} from "../../../../../store/api/UserApi";

//todo BUH-25 fetch all by id
export interface IEventPageParticipantsTabUI {
    participants: string[],
}

const EventPageParticipantsTabUI: FC<IEventPageParticipantsTabUI> = ({participants}) => {
    const [users, setUsers] = useState<string[]>([]);
    const [getUser] = useLazyGetUserByIdQuery();

    useEffect(() => {
        setUsers([]);
        participants.map(p => getUser(p)
            .unwrap()
            .then(res => setUsers(prev => [...prev, `${res.firstname}  ${res.lastName}`]))
        )
    }, [participants]);

    //todo List ListItem
    return (
        <TabPanel value={"1"}>
            <TableContainer>
                <Table>
                    <TableBody>
                        {users.map(u => (
                            <TableRow key={u}>
                                <TableCell>{u}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </TabPanel>
    );
};

export default EventPageParticipantsTabUI;
