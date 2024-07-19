import * as React from 'react'
import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

const UserTable = () => {
	const [users, setUsers] = useState([])
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedUser, setSelectedUser] = useState(null)

	useEffect(() => {
		fetch('https://dummyjson.com/users')
			.then(res => res.json())
			.then(data => setUsers(data.users))
			.catch(error => console.log('Упс, что-то пошло не так :(', error))
	})

	const handleSearch = event => {
		setSearchTerm(event.target.value)
	}

	const handleRowClick = user => {
		setSelectedUser(user)
	}

	const handleCloseDialog = () => {
		setSelectedUser(null)
	}

	const filteredUsers = users.filter(
		user =>
			user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
	)

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<div style={{ width: '65%' }}>
				<TextField
					label='Поиск'
					value={searchTerm}
					onChange={handleSearch}
					variant='outlined'
					fullWidth
					margin='normal'
				/>
			</div>
			<TableContainer style={{ maxWidth: 1200 }} component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>ФИО</TableCell>
							<TableCell align='right'>Возраст</TableCell>
							<TableCell align='right'>Пол</TableCell>
							<TableCell align='right'>Телефон</TableCell>
							<TableCell align='right'>Адрес</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredUsers.map(user => (
							<TableRow key={user.id} onClick={() => handleRowClick(user)}>
								<TableCell component='th' scope='row'>
									{user.firstName} {user.lastName}
								</TableCell>
								<TableCell align='right'>{user.age}</TableCell>
								<TableCell align='right'>{user.gender}</TableCell>
								<TableCell align='right'>{user.phone}</TableCell>
								<TableCell align='right'>
									{user.address.city}, {user.address.address}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			{selectedUser && (
				<Dialog open={true} onClose={handleCloseDialog}>
					<DialogTitle>
						{selectedUser.firstName} {selectedUser.lastName}
					</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Age: {selectedUser.age}
							<br />
							Address: {selectedUser.address.city},{' '}
							{selectedUser.address.address}
							<br />
							Height: {selectedUser.height}
							<br />
							Weight: {selectedUser.weight}
							<br />
							Phone: {selectedUser.phone}
							<br />
							Email: {selectedUser.email}
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCloseDialog} color='primary'>
							Закрыть
						</Button>
					</DialogActions>
				</Dialog>
			)}
		</div>
	)
}

export default UserTable
