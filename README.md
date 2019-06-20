Todo:
TAG:
- id:uint
- description:string
- active:bool (true/false)

Methods:
- create
- update (active/inactive)

WORK_STATION:
- id:uint
- description:string
- active:bool (true/false) -> is working or not

Methods:
- create
- update (status update)

EMPLOYEE:
- id:uint
- name:string (removed because of GDPR)
- surname:string (removed because of GDPR)
- active:bool (is employer employed/is no longer working true/false)
- skills:string (list of skills that employee has)

Methods:
- create (when someone new works)
- update (when someone is fired, or surname is changed)

WORK_STATION_EMPLOYEE:
- id_employee:uint
- id_work_station:uint
- time_start:string
- time_end:string
- status:bool (active/inactive)

Methods:
- create
- update
- change_status

WORKING_ORDER (Radni Nalog):
- work_station_id:uint
- list_of_input_tags:[]uint
- output_tag:uint (optional)
- status (pending/in_progress/done/error)
- status_description

Methods:
- create
- read_input_tag (if all input tags are read move status to in_progress)
- write_output_tag (move to done)
- error_happened (move to status error and write description)