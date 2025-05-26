    let mockDepartments = [{ id:1,name:'HR'},{ id:2,name:'Engineering'},{ id:3,name:'Sales'}];
    let mockEmployees = [{id:1,departmentId:1,name:'Alice Johnson',age:30,position:'Recruiter'},{id:2,departmentId:2,name:'Bob Smith',age:28,position:'Backend Engineer'},{id:3,departmentId:2,name:'Carol White',age:35,position:'Frontend Engineer'},{id:4,departmentId:3,name:'David Brown',age:40,position:'Sales Manager'}];
    let nextDeptId = mockDepartments.length+1, nextEmpId = mockEmployees.length+1;
    const deptList=document.getElementById('deptList'), empList=document.getElementById('empList');
    const deptSelectForm=document.getElementById('empDeptId'), filterDeptSelect=document.getElementById('filterDeptSelect');
    const filterBtn=document.getElementById('filterBtn'), showAllEmpBtn=document.getElementById('showAllEmpBtn');
    const toastEl=document.getElementById('toast');
    function showToast(msg){ toastEl.textContent=msg; toastEl.classList.add('show'); setTimeout(()=>toastEl.classList.remove('show'),2000);}    
    function loadDepartments(){ deptList.innerHTML=''; deptSelectForm.innerHTML='<option value="" disabled selected>Select Dept</option>'; filterDeptSelect.innerHTML='<option value="">All Departments</option>'; mockDepartments.forEach(d=>{ const li=document.createElement('li'); li.textContent=d.name; li.dataset.id=d.id; li.addEventListener('click',()=>loadEmployeesByDept(d.id)); deptList.appendChild(li); const optForm=document.createElement('option'); optForm.value=d.id; optForm.textContent=d.name; deptSelectForm.appendChild(optForm); const optFilter=document.createElement('option'); optFilter.value=d.id; optFilter.textContent=d.name; filterDeptSelect.appendChild(optFilter); }); }
    function renderEmployeeList(list){ empList.innerHTML=''; list.forEach(e=>{ const li=document.createElement('li'); li.textContent=`${e.name} (${e.position}, Age: ${e.age}) [Dept: ${getDeptName(e.departmentId)}]`; empList.appendChild(li); }); }
    function getDeptName(id){const d=mockDepartments.find(x=>x.id===id);return d?d.name:'Unknown';}
    function loadEmployeesByDept(id){ renderEmployeeList(mockEmployees.filter(e=>e.departmentId===id)); }
    function loadAllEmployees(){ renderEmployeeList(mockEmployees); }
    filterBtn.addEventListener('click',()=>{ const v=filterDeptSelect.value; v?loadEmployeesByDept(parseInt(v,10)):loadAllEmployees(); });
    showAllEmpBtn.addEventListener('click',loadAllEmployees);
    document.getElementById('addDeptForm').addEventListener('submit',e=>{ e.preventDefault(); const name=document.getElementById('deptName').value.trim(); if(name){ mockDepartments.push({id:nextDeptId++,name}); document.getElementById('deptName').value=''; loadDepartments(); showToast('Department added'); }});
    document.getElementById('addEmpForm').addEventListener('submit',e=>{ e.preventDefault(); const name=document.getElementById('empName').value.trim(); const age=parseInt(document.getElementById('empAge').value,10); const position=document.getElementById('empPosition').value.trim(); const dId=parseInt(deptSelectForm.value,10); if(name&&position&&dId){ mockEmployees.push({id:nextEmpId++,departmentId:dId,name,age,position}); e.target.reset(); loadDepartments(); loadAllEmployees(); showToast('Employee added'); }});
    loadDepartments(); loadAllEmployees();
