<template>
    <div>
        <header class="header">
            <Button
                label="Cadastrar usuário"
                icon="pi pi-plus"
                class="button-register p-button-success"
                @click="openModal"
            />

            <div class="col-12 md:col-4 search">
                <div class="p-inputgroup">
                    <InputText
                        placeholder="Pesquise um usuário com o email"
                        v-model="search"
                        title="Pesquise quando tiver muito usuário cadastrado"
                        :style="{ width: '300px' }"
                    />
                    <Button
                        @click="openModalSearch(search)"
                        icon="pi pi-search"
                        class="p-button-secondary"
                    />
                </div>
            </div>
        </header>

        <Dialog header="Resultado da pesquisa" v-model:visible="modalSearch">
            <ul>
                <li>Nome: {{ name }}</li>
                <li>E-mail: {{ email }}</li>
                <li>Telefone: {{ telefone }}</li>
                <li>CPF: {{ cpf }}</li>
            </ul>
        </Dialog>

        <Dialog
            :header="msg2"
            v-model:visible="modal"
            :style="{ width: '320px', height: '460px' }"
        >
            <div class="field col-12 md:col-4 personal-data">
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-user"></i>
                    </span>
                    <span class="p-float-label">
                        <InputText id="inputgroup" type="text" v-model="name" />
                        <label for="inputgroup">Nome</label>
                    </span>
                </div>
            </div>

            <div class="field col-12 md:col-4 personal-data">
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-at"></i>
                    </span>
                    <span class="p-float-label">
                        <InputText
                            id="inputgroup"
                            type="email"
                            v-model="email"
                        />
                        <label for="inputgroup">Email</label>
                    </span>
                </div>
            </div>

            <div class="field col-12 md:col-4 personal-data">
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-phone"></i>
                    </span>
                    <span class="p-float-label">
                        <InputMask
                            id="inputgroup"
                            type="text"
                            v-model="telefone"
                            mask="(99)99999-9999"
                        />
                        <label for="inputgroup">Telefone</label>
                    </span>
                </div>
            </div>

            <div class="field col-12 md:col-4 personal-data">
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-id-card"></i>
                    </span>
                    <span class="p-float-label">
                        <InputMask
                            id="inputgroup"
                            type="text"
                            v-model="cpf"
                            mask="999.999.999-99"
                        />
                        <label for="inputgroup">Cpf</label>
                    </span>
                </div>
            </div>

            <div class="button">
                <Button
                    type="submit"
                    @click="enviar"
                    :label="msg1"
                    class="p-button-raised p-button-rounded p-button-success"
                />
            </div>
        </Dialog>
        <Toast position="top-right" />
        <ConfirmDialog></ConfirmDialog>

        <Dialog
            header="Dados do usuário"
            v-model:visible="modalShow"
            :style="{ width: '320px', height: '230px' }"
        >
            <ul>
                <li>Nome: {{ name }}</li>
                <li>E-mail: {{ email }}</li>
                <li>Telefone: {{ telefone }}</li>
                <li>CPF: {{ cpf }}</li>
            </ul>
        </Dialog>

        <div>
            <DataTable :value="users">
                <Column field="id" header="id"></Column>
                <Column field="name" header="Nome"></Column>
                <Column field="email" header="E-mail"></Column>
                <Column field="telefone" header="Telefone"></Column>
                <Column header="Ações">
                    <template #body="props">
                        <Button
                            icon="pi pi-trash"
                            class="p-button-danger mr-1"
                            @click="deleteUser(props.data)"
                        ></Button>

                        <Button
                            icon="pi pi-pencil"
                            class="p-button-warning btn-actions"
                            @click="openModalUpdate(props.data)"
                        ></Button>

                        <Button
                            icon="pi pi-eye"
                            class="p-button-secondary btn-actions"
                            title="detalhes do usuário"
                            @click="openModalShow(props.data)"
                        ></Button>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<script>
import api from '../../services/index';

export default {
    name: 'ComponentTable',
    data() {
        return {
            search: '',
            modal: false,
            modalShow: false,
            modalSearch: false,
            id: '',
            name: '',
            email: '',
            telefone: '',
            cpf: '',
            msg1: '',
            msg2: '',
            users: [],
        };
    },
    mounted() {
        this.getUsers();
    },

    methods: {
        getUsers() {
            api.getUsers().then((response) => {
                this.users = response;
            });
        },

        enviar() {
            if (this.id != '') {
                let user = {
                    Id: this.id,
                    Name: this.name,
                    Email: this.email,
                    telefone: this.telefone,
                    Cpf: this.cpf,
                };
                this.updateUser(user);
            } else {
                let user = {
                    Name: this.name,
                    Email: this.email,
                    telefone: this.telefone,
                    Cpf: this.cpf,
                };
                this.registerUser(user);
            }
        },

        openModal() {
            this.modal = true;
            this.modalSearch = false;
            this.clearFields();
            this.msg1 = 'cadastrar';
            this.msg2 = 'Registro de usuário';
        },

        registerUser(user) {
            api.registerUser(user).then((response) => {
                if (response.Message) {
                    this.$toast.add({
                        severity: 'error',
                        summary: 'error',
                        detail: `${response.Message}`,
                        life: 6000,
                    });
                } else {
                    this.modal = false;
                    this.msg1 = '';
                    this.msg2 = '';
                    this.clearFields();
                    this.getUsers();
                    this.$toast.add({
                        severity: 'success',
                        summary: 'Sucesso',
                        detail: 'Usuario cadastrado',
                        life: 6000,
                    });
                }
            });
        },

        updateUser(data) {
            api.update(data).then((response) => {
                if (response.Message) {
                    this.$toast.add({
                        severity: 'error',
                        summary: 'error',
                        detail: `${response.Message}`,
                        life: 6000,
                    });
                } else {
                    this.getUsers();
                    this.clearFields();
                    this.modal = false;
                    this.$toast.add({
                        severity: 'success',
                        summary: 'Sucesso',
                        detail: 'Usuario atualizado',
                        life: 6000,
                    });
                }
            });
        },

        deleteUser(data) {
            this.$confirm.require({
                message: `Deseja excluir ${data.name}`,
                header: 'Confirme',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    api.deleteUser(data.id).then(() => {
                        this.getUsers();
                        this.$toast.add({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Usuário deletado',
                            life: 6000,
                        });
                    });
                },
            });
        },

        openModalUpdate(data) {
            api.getUser(data.id).then((response) => {
                this.modal = true;
                this.modalSearch = false;
                this.msg1 = 'atualizar';
                this.msg2 = 'Atualizar usuário';
                this.id = response.id;
                this.name = response.name;
                this.email = response.email;
                this.telefone = response.telefone;
                this.cpf = response.cpf;
            });
        },

        openModalShow(data) {
            api.getUser(data.id).then((response) => {
                this.modalShow = true;
                this.modalSearch = false;
                this.name = response.name;
                this.email = response.email;
                this.telefone = response.telefone;
                this.cpf = response.cpf;
            });
        },

        openModalSearch(search) {
            api.search(search).then((response) => {
                if (response.Message) {
                    this.$toast.add({
                        severity: 'error',
                        summary: 'error',
                        detail: `${response.Message}`,
                        life: 6000,
                    });
                } else {
                    this.modalSearch = true;
                    this.name = response.name;
                    this.email = response.email;
                    this.telefone = response.telefone;
                    this.cpf = response.cpf;
                }
            });
        },

        clearFields() {
            this.id = '';
            this.name = '';
            this.email = '';
            this.telefone = '';
            this.cpf = '';
        },
    },
};
</script>

<style scoped>
.header {
    background-color: #0074f8;
    height: 60px;
    display: flex;
    align-items: center;
}

.header .button-register {
    margin: 0px 0px 0px 20px;
}

.header .search {
    margin: 0px 0px 0px 30px;
}

.personal-data {
    margin: 30px 0px 0px 0px;
}

.button {
    text-align: center;
    margin: 30px 0px 0px 0px;
}
.btn-actions {
    margin: 0px 0px 0px 15px;
}

ul {
    list-style: none;
}

ul li {
    margin: 6px 0;
}
</style>
