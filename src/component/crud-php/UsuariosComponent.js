import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Snackbar, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { getUsuarios, deleteUsuarios, createUsuario, updateUsuario } from '../../services/api-services';

function UsuariosComponent() {
    const [usuarios, setUsuarios] = useState([]);
    const [open, setOpen] = useState(false);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [editingUsuarioId, setEditingUsuarioId] = useState(null);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        getUsuarios()
            .then(response => {
                setUsuarios(response.data);
            });
    }, []);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleDelete = (id) => {
        deleteUsuarios(id).then(() => {
            getUsuarios().then(response => {
                setUsuarios(response.data);
            });
            setSnackbarMessage('Usuário excluído com sucesso');
            handleClick();
        });
    };

    const handleCreate = () => {
        const newUsuario = {
            nome: nome,
            email: email
        };

        createUsuario(newUsuario).then(() => {
            getUsuarios().then(response => {
                setUsuarios(response.data);
            });
            setNome('');
            setEmail('');
            setSnackbarMessage('Usuário criado com sucesso');
            handleClick();
        });
    };

    const handleUpdate = () => {
        const idUsuario = editingUsuarioId;
        const updatedUsuario = {
            nome: nome,
            email: email
        };

        updateUsuario(idUsuario, updatedUsuario).then(() => {
            getUsuarios().then(response => {
                setUsuarios(response.data);
            });
            setNome('');
            setEmail('');
            setEditingUsuarioId(null);
            setSnackbarMessage('Usuário atualizado com sucesso');
            handleClick();
        });
    };

    const handleEdit = (id, nome, email) => {
        setNome(nome);
        setEmail(email);
        setEditingUsuarioId(id);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'nome', headerName: 'Nome', width: 130 },
        { field: 'email', headerName: 'Email', width: 130 },
        {
            field: 'actions',
            headerName: 'Ações',
            sortable: false,
            width: 200,
            renderCell: (params) => (
                <>
                    <Button onClick={() => handleEdit(params.row.id, params.row.nome, params.row.email)}>Editar</Button>
                    <Button onClick={() => handleDelete(params.row.id)}>Excluir</Button>
                </>
            ),
        },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <Button onClick={() => {
                setNome('');
                setEmail('');
                setEditingUsuarioId(null);
                setDialogOpen(true);
            }}>Adicionar Usuário</Button>
            <DataGrid
                rows={usuarios}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />

            <Dialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                aria-labelledby="dialog-title"
                aria-describedby="dialog-description"
            >
                <DialogTitle id="dialog-title">{editingUsuarioId ? 'Editar Usuário' : 'Cadastrar Usuário'}</DialogTitle>
                <DialogContent style={{ overflowY: "initial" }}>
                    <TextField
                        label="Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        style={{ marginBottom: "10px" }}
                    />
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ marginBottom: "10px" }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} style={{ marginRight: "10px" }}>
                        Cancelar
                    </Button>
                    {editingUsuarioId ? (
                        <Button onClick={handleUpdate}>Atualizar</Button>
                    ) : (
                        <Button onClick={handleCreate}>Cadastrar</Button>
                    )}
                </DialogActions>
            </Dialog>

            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={snackbarMessage}
            />
        </div>
    );
}

export default UsuariosComponent;