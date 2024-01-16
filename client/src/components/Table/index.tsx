import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import { ITasks, addTask, deleteTask, editTask, getTasks } from '../../context/AuthProvider/util';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { message } from 'antd';
import { useAuth } from '../../context/AuthProvider/useAuth';
import TextField from '@mui/material/TextField';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';


export default function BasicTable() {
    const auth = useAuth()
    const name = auth.data?.name
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
      

  const [rows, setRows] = useState<ITasks[]>([]);
  const [open, setOpen] = useState(false);
  const [openAddTask,setOpenAddTask] = useState(false)
  const [openEditTask,setOpenEditTask] = useState(false)

  const [idTask, setIdTask] = useState<number | null>(null); 
  const [title,setTitle] = useState<string>("")
  const [subtitle,setSubTitle] = useState<string>("")

  const [titleEdit,setTitleEdit] = useState<string>("")
  const [subtitleEdit,setSubTitleEdit] = useState<string>("")
const navigate = useNavigate()

 
    useEffect(() => {
    const fetchData = async () => {
      try {
        const tasks = await getTasks();
        if (tasks) {
          setRows(tasks);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchData();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenAddTask = () => setOpenAddTask(true);
  const handleCloseAddTask = () => setOpenAddTask(false);

  const handleOpenEditTask = () => setOpenEditTask(true);
  const handleCloseEditTask = () => setOpenEditTask(false);


  const handleEditClick = (row:ITasks) => {
    // Handle edit action using the id
    console.log(`Editing row with`,row);
    setIdTask(row.id);
    setTitleEdit(row.title)
    setSubTitleEdit(row.subtitle)
    handleOpenEditTask()
  };

const handleDeleteClick = (id: number) => {
  console.log(`Deleting row with id ${id}`);
  setIdTask(id);
  handleOpen(); // Abra o modal aqui, se necessário
};

  const deleteRow = async () => {
    try {

      if (idTask !== null) {
        // Check if idTask is not null before attempting to delete
       const response =  await deleteTask(idTask);
       console.log(response)
       if(response?.status == 200){
        message.success("Task deleted successfully")
       } else{
         message.error("Error while deleting the task")

       }
        const tasks = await getTasks();
        if (tasks) {
          setRows(tasks);
        }
        handleClose();

      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addNewTaskOpen = ()=>{
    handleOpenAddTask()
  }

   const addNewTask = async ()=>{
        if(title.trim().length == 0){
            return message.info("Title cannot be empty")
        }
        if(subtitle.trim().length == 0){
            return message.info("Title cannot be empty")
        }

        handleCloseAddTask()
   
    const add = await addTask(title,subtitle)
        if(add){
            setTitle("")
            setSubTitle("")
            message.success("Task created successfully")
            const tasks = await getTasks();
            if (tasks) {
            setRows(tasks);
            }
        } else{
            message.error("Error while creating the task")
        }

   }

   const editTaskRow = async () =>{
        if(idTask == null){return}
        const edit = await editTask(idTask,titleEdit,subtitleEdit)
        if(edit){
            message.success("Task edited successfully")
            const tasks = await getTasks();
            if (tasks) {
            setRows(tasks);
            }
            handleCloseEditTask()
            
        } else{
            message.error("Error while creating the task")
        }
    }


  const logout = ()=>{
    navigate("/login")
  
    auth.logout()
  }

  return (
    <Box>
    {/* Modal delete */}
     <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete Task
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this task?
          </Typography>
          <Button variant='contained' style={{marginTop:"2rem", width:"100%"}} onClick={deleteRow}>
            Yes,delete it
          </Button>
        </Box>
      </Modal>

            {/* Modal Add Task */}

        <Modal
                open={openAddTask}
                onClose={handleCloseAddTask}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add New Task
                </Typography>
                <TextField id="standard-basic" label="Title" variant="standard" style={{width:"100%",marginBottom:"1rem",marginTop:"1rem"}}
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                />
                <TextField id="standard-basic" label="Subtitle" variant="standard" style={{width:"100%",marginBottom:"1rem"}} 
                 value={subtitle}
                 onChange={(e)=>setSubTitle(e.target.value)}
                />

                
                <Button variant='contained' style={{marginTop:"2rem", width:"100%"}} onClick={addNewTask}>
                    Add Task
                </Button>
                </Box>
        </Modal>

                {/* Modal Edit Task */}

                <Modal
                open={openEditTask}
                onClose={handleCloseEditTask}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Edit task
                </Typography>
                <TextField id="standard-basic" label="Title" variant="standard" style={{width:"100%",marginBottom:"1rem",marginTop:"1rem"}}
                value={titleEdit}
                onChange={(e)=>setTitleEdit(e.target.value)}
                />
                <TextField id="standard-basic" label="Subtitle" variant="standard" style={{width:"100%",marginBottom:"1rem"}} 
                 value={subtitleEdit}
                 onChange={(e)=>setSubTitleEdit(e.target.value)}
                />

                
                <Button variant='contained' style={{marginTop:"2rem", width:"100%"}} onClick={editTaskRow}>
                    Edit task
                </Button>
                </Box>
        </Modal>


        <Box sx={{display:"flex", justifyContent:"space-between", marginBottom:"2rem",alignItems:"center"}}> 
          <Button  onClick={logout}>
          <LogoutIcon />

          </Button>
        <LogoutIcon />

        <h1>Hello {name}</h1>
        <Button variant='contained' style={{height:"50%"}} onClick={addNewTaskOpen}>
            Add new task
        </Button>
        </Box>

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Titulo</TableCell>
            <TableCell align="right">Subtitulo</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.subtitle}</TableCell>
              <TableCell align="right">
                <IconButton
                  aria-label="editar"
                  onClick={() => handleEditClick(row)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                    aria-label="deletar"
                    onClick={() => handleDeleteClick(row.id)}
                >
                    <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
   
  );
}
