'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, QrCode } from "lucide-react"
import Image from "next/image"

export function CurpGenerator() {
  const [showResult, setShowResult] = useState(false)
  const [curp, setCurp] = useState('')
  const [formData, setFormData] = useState({
    nombres: '',
    primerApellido: '',
    segundoApellido: '',
    dia: '',
    mes: '',
    año: '',
    sexo: '',
    estado: ''
  })

  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ]

  const dias = Array.from({length: 31}, (_, i) => i + 1)

  const estados = [
    "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas",
    "Chihuahua", "Ciudad de México", "Coahuila", "Colima", "Durango", "Estado de México",
    "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "Michoacán", "Morelos", "Nayarit",
    "Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí",
    "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: `
          nombre: ${formData.nombres}
          apellido_paterno: ${formData.primerApellido}
          apellido_materno: ${formData.segundoApellido}
          dia: ${formData.dia}
          mes: ${formData.mes}
          anio: ${formData.año}
          sexo: ${formData.sexo}
          entidad: ${formData.estado}
        `,
        nombre: formData.nombres,
        apellido_paterno: formData.primerApellido,
        apellido_materno: formData.segundoApellido,
        dia: formData.dia,
        mes: formData.mes,
        anio: formData.año,
        sexo: formData.sexo,
        entidad: formData.estado
      })
    })
    const data = await response.json()
    if (data.errors.length === 0 && data.curp) {
      setCurp(data.curp)
      setShowResult(true)
    } else {
      alert('Error al generar la CURP: ' + data.errors.join(', '))
    }
  }

  const handleNewSearch = () => {
    setShowResult(false)
    setFormData({
      nombres: '',
      primerApellido: '',
      segundoApellido: '',
      dia: '',
      mes: '',
      año: '',
      sexo: '',
      estado: ''
    })
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#4A1942] to-[#93712F] p-6">
        <Card className="max-w-4xl mx-auto border-[#93712F]/20">
          <CardContent className="p-0">
            <div className="relative border-8 border-[#1B8A6B] rounded-lg p-8 bg-white">
              <div className="absolute inset-0 border-[16px] border-[#1B8A6B]/10 rounded-lg pointer-events-none" />
              
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Image
                    src="/segob.png?height=100&width=100"
                    alt="SEGOB Logo"
                    width={120}
                    height={120}
                    className="object-contain"
                  />
                </div>
                <div className="text-right text-xs text-gray-500">
                  DIRECCIÓN GENERAL DEL<br />
                  REGISTRO NACIONAL DE POBLACIÓN<br />
                  E IDENTIDAD
                </div>
              </div>

              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">ESTADOS UNIDOS MEXICANOS</h1>
                <h2 className="text-lg text-gray-600">
                  CONSTANCIA DE LA CLAVE ÚNICA<br />
                  DE REGISTRO DE POBLACIÓN
                </h2>
              </div>

              <div className="grid grid-cols-[200px,1fr,200px] gap-8">
                <div className="border-2 border-[#1B8A6B] p-1">
                  <div className="aspect-square bg-white flex items-center justify-center">
                    <Image
                      src="/mexico.png?height=180&width=180"
                      alt="Foto de identificación"
                      width={180}
                      height={180}
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="font-bold text-gray-700">Clave:</div>
                    <div className="text-2xl font-mono mt-1">{curp}</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-700">Nombre:</div>
                    <div className="mt-1">{`${formData.nombres} ${formData.primerApellido} ${formData.segundoApellido}`}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="font-bold text-gray-700">Fecha de Nacimiento:</div>
                      <div className="mt-1">{`${formData.dia}/${formData.mes}/${formData.año}`}</div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-700">Sexo:</div>
                      <div className="mt-1">{formData.sexo}</div>
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-700">Entidad de registro:</div>
                    <div className="mt-1">{formData.estado}</div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <QrCode className="w-32 h-32" />
                </div>
              </div>

              <div className="mt-8 flex justify-between items-end">
                <div className="h-16 w-64 bg-[repeating-linear-gradient(90deg,#000,#000_2px,transparent_2px,transparent_4px)]" />
                <div className="bg-yellow-100 border border-yellow-400 px-3 py-1 text-sm">
                  CURP No Certificada
                </div>
              </div>
              <div className="mt-2 text-right text-sm text-gray-500">
                Foto: CURP
              </div>
            </div>

            <div className="p-6">
              <Button 
                onClick={handleNewSearch}
                className="w-full bg-[#4A1942] hover:bg-[#4A1942]/90 text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Nueva Búsqueda
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A1942] to-[#93712F] p-6">
      <Card className="max-w-2xl mx-auto border-[#93712F]/20">
        <CardHeader className="border-b border-[#93712F]/20">
          <CardTitle className="text-2xl text-center text-[#4A1942]">Generador de CURP</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nombres" className="text-[#4A1942]">Nombre(s)*</Label>
                <Input
                  id="nombres"
                  placeholder="Ingresa tu nombre(s)"
                  required
                  value={formData.nombres}
                  onChange={(e) => setFormData({...formData, nombres: e.target.value})}
                  className="border-[#93712F]/20 focus:border-[#4A1942] focus:ring-[#4A1942]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="primerApellido" className="text-[#4A1942]">Primer apellido*</Label>
                <Input
                  id="primerApellido"
                  placeholder="Ingresa tu primer apellido"
                  required
                  value={formData.primerApellido}
                  onChange={(e) => setFormData({...formData, primerApellido: e.target.value})}
                  className="border-[#93712F]/20 focus:border-[#4A1942] focus:ring-[#4A1942]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="segundoApellido" className="text-[#4A1942]">Segundo apellido</Label>
                <Input
                  id="segundoApellido"
                  placeholder="Ingresa tu segundo apellido"
                  value={formData.segundoApellido}
                  onChange={(e) => setFormData({...formData, segundoApellido: e.target.value})}
                  className="border-[#93712F]/20 focus:border-[#4A1942] focus:ring-[#4A1942]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dia" className="text-[#4A1942]">Día de nacimiento*</Label>
                <Select required onValueChange={(value) => setFormData({...formData, dia: value})}>
                  <SelectTrigger className="border-[#93712F]/20 focus:ring-[#4A1942]">
                    <SelectValue placeholder="Seleccionar el día" />
                  </SelectTrigger>
                  <SelectContent>
                    {dias.map((dia) => (
                      <SelectItem key={dia} value={dia.toString().padStart(2, '0')}>
                        {dia}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="mes" className="text-[#4A1942]">Mes de nacimiento*</Label>
                <Select required onValueChange={(value) => setFormData({...formData, mes: value})}>
                  <SelectTrigger className="border-[#93712F]/20 focus:ring-[#4A1942]">
                    <SelectValue placeholder="Seleccionar el mes" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px] overflow-y-auto">
                    {meses.map((mes, index) => (
                      <SelectItem key={mes} value={(index + 1).toString().padStart(2, '0')}>
                        {mes}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="año" className="text-[#4A1942]">Año de nacimiento*</Label>
                <Input
                  id="año"
                  placeholder="Ej. 1943"
                  required
                  value={formData.año}
                  onChange={(e) => setFormData({...formData, año: e.target.value})}
                  className="border-[#93712F]/20 focus:border-[#4A1942] focus:ring-[#4A1942]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sexo" className="text-[#4A1942]">Sexo*</Label>
                <Select required onValueChange={(value) => setFormData({...formData, sexo: value})}>
                  <SelectTrigger className="border-[#93712F]/20 focus:ring-[#4A1942]">
                    <SelectValue placeholder="Selecciona el sexo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="H">Hombre</SelectItem>
                    <SelectItem value="M">Mujer</SelectItem>
                    <SelectItem value="NB">No binario</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="estado" className="text-[#4A1942]">Estado*</Label>
                <Select required onValueChange={(value) => setFormData({...formData, estado: value})}>
                  <SelectTrigger className="border-[#93712F]/20 focus:ring-[#4A1942]">
                    <SelectValue placeholder="Selecciona el estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {estados.map((estado) => (
                      <SelectItem key={estado} value={estado}>
                        {estado}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full mt-6 bg-[#4A1942] hover:bg-[#4A1942]/90 text-white"
            >
              Generar CURP
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}