'use client'
import { useState, useEffect } from 'react'
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react'
import Pagination from './pagination'
import clsx from 'clsx'

type TableHeader = {
  label: string // Nombre de la cabecera
  key: string // Clave de los datos correspondientes
  visible?: boolean // Indica si la cabecera debe ser visible o no
}

export type TableData = {
  [key: string]: any // Permitir cualquier nombre de propiedad
}

export function TableComponent({
  className,
  headers,
  data,
  totalPages,
  allChecked,
  selecteable,
  onPageChange,
}: {
  className?: string
  headers: TableHeader[] // Descripción de las cabeceras de la tabla
  data: TableData[] // Datos de la tabla
  totalPages?: number
  allChecked?: boolean | undefined
  selecteable?: boolean | undefined
  onPageChange: (data: TableData[]) => void
}) {
  const [selectedRows, setSelectedRows] = useState<TableData[]>([])
  const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false)

  const toggleRowSelection = (row: TableData) => {
    // Verifica si el row ya está seleccionado
    const isRowSelected = selectedRows.some(
      (selectedRow) => selectedRow.id === row.id
    )

    // Si está seleccionado, lo eliminamos de la lista de seleccionados
    if (isRowSelected) {
      setSelectedRows(
        selectedRows.filter((selectedRow) => selectedRow.id !== row.id)
      )
    } else {
      // Si no está seleccionado, lo agregamos a la lista de seleccionados
      setSelectedRows([...selectedRows, row])
    }
  }

  const toggleSelectAll = () => {
    if (selectAllChecked) {
      setSelectedRows([])
    } else {
      setSelectedRows([...data])
    }
    setSelectAllChecked(!selectAllChecked)
  }
  useEffect(() => {
    // Llama a la función de devolución de llamada cuando cambia la data seleccionada
    onPageChange(selectedRows)
  }, [selectedRows, onPageChange])

  return (
    <Card className={className}>
      {data.length === 0 ? (
        <div className="flex justify-center items-center">
          <p className="text-center py-5">No hay datos para mostrar</p>
        </div>
      ) : (
        <Table className="mt-5">
          <TableHead>
            <TableRow>
              <TableCell
                className={clsx('hidden', {
                  flex: selecteable || allChecked,
                })}
              >
                <input
                  type="checkbox"
                  checked={selectAllChecked}
                  onChange={toggleSelectAll}
                />
              </TableCell>{' '}
              {headers?.map(
                (header, index) =>
                  // Solo renderiza la cabecera si es visible o si no tiene la propiedad visible
                  (header.visible === undefined || header.visible) && (
                    <TableHeaderCell
                      key={header.key}
                      className={' text-center'}
                    >
                      {header.label}
                    </TableHeaderCell>
                  )
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((item, dataIndex) => (
              <TableRow key={item.id}>
                <TableCell
                  className={clsx('hidden text-right', {
                    flex: selecteable || allChecked,
                  })}
                >
                  <input
                    type="checkbox"
                    checked={selectedRows.some(
                      (selectedRow, index) => selectedRow.id === item.id
                    )}
                    onChange={() => toggleRowSelection(item)}
                  />
                </TableCell>
                {headers.map(
                  (header, headerIndex) =>
                    // Solo renderiza la celda si la cabecera es visible o si no tiene la propiedad visible
                    (header.visible === undefined || header.visible) && (
                      <TableCell key={header.key} className={' text-center'}>
                        {item[header.key]}
                      </TableCell>
                    )
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {totalPages ? (
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      ) : null}
    </Card>
  )
}
