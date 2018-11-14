# # -*- coding: utf-8 -*-

from flask import Flask
from flask import request
from flask import jsonify
from functools import reduce

from datetime import date, datetime
import json

from conectarBQ import obtener_datos
from conectarPSQL import config_con
from conectarPSQL import config_datos
import smtplib
import psycopg2
import locale
import pprint
import sys
import os

locale.setlocale( locale.LC_ALL, '' )
#locale.currency( row[1], grouping = True ) 
app = Flask(__name__)

@app.after_request
def after_request(response):
	response.headers.add('Access-Control-Allow-Origin', '*')
	response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
	response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
	return response

url_base='/MasNomina/EnviadorEmail'

def make_error(status_code, sub_code, message, action):
	response = jsonify({
		'status': status_code,
		'sub_code': sub_code,
		'message': message,
		'action': action
	})
	response.status_code = status_code
	return response

def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""

    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    raise TypeError ("Type %s not serializable" % type(obj))

@app.route(url_base)
def hello():
	return "Monitor EMAIL Estatus[OK]"

@app.route(url_base + '/getRegistro')
def getRegistro():
	id_reporte = request.args.get('id_reporte')
	conn = None #No conexion
	try:
		#Parametros de conexion db
		params = config_con(os.path.dirname(__file__)+'/fichero.ini','postgresql')
		print('Connecting to the PostgreSQL database...')
		conn = psycopg2.connect(**params)
		cur = conn.cursor()		
		#Empresas (empresa, correo, estatus = 'A') ok 
		cur.execute("SELECT  nombre, apellido_pat,apellido_mat, correo, id_division, id_sucursal, estatus,fecha_alta, id_reporte FROM public.mn_cor_personas WHERE id_cor_persona = " + id_reporte + ";")
		data = cur.fetchall()

		return json.dumps(data, default=json_serial)
		
	except (Exception, psycopg2.DatabaseError) as error:
		print(error)
		#En caso de generarse algun error, se llama a la funcion make_error con los detalles del mismo
		return make_error(500, 42, 'Error: ' + str(error) + '. No se pudo conectar a la Base de Datos , favor de comunicarse  con el administrador de Sistemas.' , ' ')
		
	finally:
		if conn is not None:
			conn.close()
			print('Database connection closed.')

@app.route(url_base + '/getCorreo')
def getCorreo():
	id_reporte = request.args.get('id_reporte')
	conn = None #No conexion
	try:
		#Parametros de conexion db
		params = config_con(os.path.dirname(__file__)+'/fichero.ini','postgresql')
		print('Connecting to the PostgreSQL database...')
		conn = psycopg2.connect(**params)
		cur = conn.cursor()		
		#Empresas (empresa, correo, estatus = 'A') ok 
		cur.execute("SELECT correo FROM public.mn_cor_personas WHERE id_cor_persona = " + id_reporte + ";")
		data = cur.fetchall()

		return json.dumps(data, default=json_serial)
		
	except (Exception, psycopg2.DatabaseError) as error:
		print(error)
		#En caso de generarse algun error, se llama a la funcion make_error con los detalles del mismo
		return make_error(500, 42, 'Error: ' + str(error) + '. No se pudo conectar a la Base de Datos , favor de comunicarse  con el administrador de Sistemas.' , ' ')
		
	finally:
		if conn is not None:
			conn.close()
			print('Database connection closed.')


@app.route(url_base + '/getRegistrosCorreos')
def getRegistrosCorreos():
	conn = None #No conexion

	try:
		#Parametros de conexion db
		params = config_con(os.path.dirname(__file__)+'/fichero.ini','postgresql')
		print('Connecting to the PostgreSQL database...')
		conn = psycopg2.connect(**params)
		cur = conn.cursor()		
		#Empresas (empresa, correo, estatus = 'A') ok 
		cur.execute("SELECT  nombre, apellido_pat,apellido_mat, correo, id_division, id_sucursal,cast(fecha_alta as date), id_reporte, id_cor_persona FROM public.mn_cor_personas WHERE estatus = 'A' ORDER BY fecha_alta;")
		data = cur.fetchall()

		return json.dumps(data, default=json_serial)
		
	except (Exception, psycopg2.DatabaseError) as error:
		print(error)
		#En caso de generarse algun error, se llama a la funcion make_error con los detalles del mismo
		return make_error(500, 42, 'Error: ' + str(error) + '. No se pudo conectar a la Base de Datos , favor de comunicarse  con el administrador de Sistemas.' , ' ')
		
	finally:
		if conn is not None:
			conn.close()
			print('Database connection closed.')

@app.route(url_base + '/eliminarRegistro')
def eliminarRegistro():
	id_cor = request.args.get('id_cor')

	conn = None #No conexion

	try:
		#Parametros de conexion db
		params = config_con(os.path.dirname(__file__)+'/fichero.ini','postgresql')
		print('Connecting to the PostgreSQL database...')
		conn = psycopg2.connect(**params)
		cur = conn.cursor()		

		update = "update mn_cor_personas set estatus='I' where id_cor_persona = " +id_cor+";"

		cur.execute(update, ())

		conn.commit() #Insercion en db ok
		cur.close()	
		return '1'
		
	except (Exception, psycopg2.DatabaseError) as error:
		print(error)
		#En caso de generarse algun error, se llama a la funcion make_error con los detalles del mismo
		return make_error(500, 42, 'Error: ' + str(error) + '. No se pudo conectar a la Base de Datos , favor de comunicarse  con el administrador de Sistemas.' , ' ')
		
	finally:
		if conn is not None:
			conn.close()
			print('Database connection closed.')

@app.route(url_base + '/modificarRegistro')
def modificarRegistro():
	id_cor = request.args.get('id_cor')
	correo = request.args.get('correo')
	nombre = request.args.get('nombre')
	apellido_pat = request.args.get('apellido_pat')
	apellido_mat = request.args.get('apellido_mat')
	id_reporte = request.args.get('id_reporte')
	id_division = request.args.get('id_division')
	id_sucursal = request.args.get('id_sucursal')
	fecha_ult_mod = datetime.today().strftime("%Y/%m/%d %H:%M:%S")

	conn = None #No conexion

	try:
		#Parametros de conexion db
		params = config_con(os.path.dirname(__file__)+'/fichero.ini','postgresql')
		print('Connecting to the PostgreSQL database...')
		conn = psycopg2.connect(**params)
		cur = conn.cursor()		
		#Empresas (empresa, correo, estatus = 'A') ok 


		update = "UPDATE public.mn_cor_personas SET "
		update += "  correo= '" + correo + "'"
		update += " , id_reporte= " + id_reporte
		update += " , nombre= '" + nombre + "'"
		update += " , apellido_pat= '" + apellido_pat + "'"
		update += " , apellido_mat= '" + apellido_mat + "'"
		if(id_division == ""):
			update += " , id_division= null"
		else:
			update += " , id_division= " + id_division
		if(id_sucursal == ""):
			update += " , id_sucursal= null"
		else:
			update += " , id_sucursal= " + id_sucursal
		update += " , fecha_ult_mod= '" + fecha_ult_mod + "'"
		update += " WHERE id_cor_persona = "+id_cor+";"

		cur.execute(update, ())

		conn.commit() #Insercion en db ok
		cur.close()	
		return '1'
		
	except (Exception, psycopg2.DatabaseError) as error:
		print(error)
		#En caso de generarse algun error, se llama a la funcion make_error con los detalles del mismo
		return make_error(500, 42, 'Error: ' + str(error) + '. No se pudo conectar a la Base de Datos , favor de comunicarse  con el administrador de Sistemas.' , ' ')
		
	finally:
		if conn is not None:
			conn.close()
			print('Database connection closed.')

@app.route(url_base + '/agregarRegistro')
def agregarRegistro():
	correo = request.args.get('correo')
	nombre = request.args.get('nombre')
	apellido_pat = request.args.get('apellido_pat')
	apellido_mat = request.args.get('apellido_mat')
	id_reporte = request.args.get('id_reporte')
	id_division = request.args.get('id_division')
	id_sucursal = request.args.get('id_sucursal')
	estatus = 'A'
	fecha_alta = datetime.today().strftime("%Y/%m/%d %H:%M:%S")
	fecha_ult_mod = datetime.today().strftime("%Y/%m/%d %H:%M:%S")

	conn = None #No conexion

	try:
		#Parametros de conexion db
		params = config_con(os.path.dirname(__file__)+'/fichero.ini','postgresql')
		print('Connecting to the PostgreSQL database...')
		conn = psycopg2.connect(**params)
		cur = conn.cursor()		
		#Empresas (empresa, correo, estatus = 'A') ok 


		insert = "insert into mn_cor_personas(correo, nombre, apellido_pat, apellido_mat, id_reporte, id_division, id_sucursal, estatus, fecha_alta, fecha_ult_mod) "
		insert += "values ("
		insert += "'" + correo + "', "
		insert += "'" + nombre + "', "
		insert += "'" + apellido_pat + "', "
		insert += "'" + apellido_mat + "', "
		insert += id_reporte + ", "
		if(id_division == ""):
			insert +=  "null, "
		else:
			insert += id_division + ", "
		if(id_sucursal == ""):
			insert +=  "null, "
		else:
			insert += id_sucursal + ", "
		insert += "'" + estatus + "', "
		insert += "'" + fecha_alta + "', "
		insert += "'" + fecha_ult_mod + "'); "

		print(insert)

		cur.execute(insert, ())

		cur.execute('SELECT LASTVAL()')
		#id del email recien insertado en la db
		id_comentario = cur.fetchone()[0]
		print 'ID comentario: ' + str (id_comentario)
		conn.commit() #Insercion en db ok
		cur.close()	
		return '1'
		
	except (Exception, psycopg2.DatabaseError) as error:
		print(error)
		#En caso de generarse algun error, se llama a la funcion make_error con los detalles del mismo
		return make_error(500, 42, 'Error: ' + str(error) + '. No se pudo conectar a la Base de Datos , favor de comunicarse  con el administrador de Sistemas.' , ' ')
		
	finally:
		if conn is not None:
			conn.close()
			print('Database connection closed.')


@app.route(url_base + '/getDivisiones')
def getDivisiones():
    sql = "select division, nombre from BUO_Masnomina.masnomina_divisiones"

    return json.dumps(obtener_datos(sql, False, ()))

@app.route(url_base + '/getSucursales')
def getSucursales():
    sql = "select division,sucursal, nombre from BUO_Masnomina.masnomina_sucursales"

    return json.dumps(obtener_datos(sql, False, ()))

if __name__ == '__main__':	
	#si Rest.py
	app.run(host="127.0.0.1",debug=True, port=9999, threaded=True)
















    
	

