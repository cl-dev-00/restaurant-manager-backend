import { Optional, Model, DataTypes } from 'sequelize';
import { sequelizeConnection } from '../db/connection';


interface CashRegisterAttributes {
    idCashRegister: number;
    idComercial: number;
    fecha: Date;
    hora_inicio: Date;
    hora_final: Date;
    estado: boolean;
    saldo_inicial: number;
    saldo_final: number;
    ingresos: number;
    gastos: number;
    efectivo: number;
    creditos: number;
    dinero_real: number;
    faltante: number;

    deletedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

interface CashRegisterInput extends Optional<CashRegisterAttributes, 'idCashRegister' | 'estado' | 'hora_final' | 'saldo_final' | 'ingresos' | 'creditos' | 'gastos' | 'efectivo' | 'dinero_real'  | 'faltante'> { }

class CashRegister extends Model<CashRegisterAttributes, CashRegisterInput> {
    public idCashRegister!: number;
    public idComercial!: number;
    public fecha!: Date;
    public hora_inicio!: Date;
    public hora_final!: Date;
    public estado!: boolean;
    public saldo_inicial!: number;
    public saldo_final!: number;
    public ingresos!: number;
    public gastos!: number;
    public efectivo!: number;
    public creditos!: number;
    public dinero_real!: number;
    public faltante!: number;
    
    public readonly deletedAt?: Date;
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
}

CashRegister.init({
    idCashRegister: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idComercial: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hora_inicio: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    hora_final: {
        type: DataTypes.TIME,
        allowNull: true,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    saldo_inicial: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    saldo_final: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    ingresos: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    gastos: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    efectivo: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    creditos: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    dinero_real: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    faltante: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
}, {
    modelName: 'cash_register',
    sequelize: sequelizeConnection,
    paranoid: true,
    timestamps: true,
});

export default CashRegister;