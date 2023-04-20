import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'name', label: 'Name', minWidth: 110 },
  { id: 'email', label: 'Email', minWidth: 70 },
  {
    id: 'roll',
    label: 'Roll',
    minWidth: 10,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'course',
    label: 'Course',
    minWidth: 110,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];

export default function StickyHeadTable() {
  const [taskDatas, setTaskData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  useEffect(() => {
    axios
      .get('http://localhost:3001/student_details')
      .then((res) => {
        console.log(res.data.data);
        setTaskData(res.data.data);
      })
      .catch((error) => {
        console.error('Error fetching task data:', error);
      });
  }, []);

  return (
    <Paper sx={{ width: '60%', overflow: 'hidden', margin: 'auto', mt: '70px' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell sx={{ margin:'auto', textAlign:'center', fontSize:'17.8px' }}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
            </TableHead>
          <TableBody>
            {taskDatas
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    <TableCell sx={{margin:'auto',textAlign:'center',bgcolor:'whitesmoke'}}>{row.name}</TableCell>
                    <TableCell sx={{margin:'auto',textAlign:'center',bgcolor:'whitesmoke'}}>{row.email}</TableCell>
                    <TableCell sx={{margin:'auto',textAlign:'center',bgcolor:'whitesmoke'}}>{row.roll}</TableCell>
                    <TableCell sx={{margin:'auto',textAlign:'center',bgcolor:'whitesmoke'}}>{row.course}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={taskDatas.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}