import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne, JoinColumn } from "typeorm"

@Entity()
export class Cliente {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column()
    email: string

    @OneToMany(() => Pedido, pedido => pedido.cliente)
    pedidos: Pedido[]
}

@Entity()
export class Pedido {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'timestamp' })
    dataCriacao: Date

    @Column()
    status: string

    @ManyToOne(() => Cliente, cliente => cliente.pedidos)
    cliente: Cliente

    @OneToMany(() => ItemPedido, item => item.pedido)
    itens: ItemPedido[]

    @OneToOne(() => Pagamento, pagamento => pagamento.pedido)
    @JoinColumn()
    pagamento: Pagamento
}

@Entity()
export class ItemPedido {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    quantidade: number

    @ManyToOne(() => Pedido, pedido => pedido.itens)
    pedido: Pedido

    @ManyToOne(() => Produto, produto => produto.itens)
    produto: Produto
}

@Entity()
export class Produto {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column("decimal")
    preco: number

    @OneToMany(() => ItemPedido, item => item.produto)
    itens: ItemPedido[]
}

@Entity()
export class Pagamento {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    formaPagamento: string

    @Column("decimal")
    valor: number

    @OneToOne(() => Pedido, pedido => pedido.pagamento)
    pedido: Pedido
}
