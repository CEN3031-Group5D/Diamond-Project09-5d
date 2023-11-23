import React, { useEffect, useState } from 'react';
import NavBar from "../../components/NavBar/NavBar";
import './OrgDashboard.less';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import DeleteOrgModal from './DeleteOrgModal';
import { getOrganizations, getAllOrgs, updateOrgName } from "../../Utils/requests"

export default function OrgDashboard() {
	const [orgs, setOrgs] = useState([]);
	const navigate = useNavigate();
	const [isFlipped, setIsFlipped] = useState(new Set());
	const [orgName, setOrgName] = useState('');

	useEffect(() => {
    	let orgList = [];

    	// TODO: update to be admin-specific orgs (use Mentor/Dashboard/Dashboard.jsx as a model)
    	  
    	getAllOrgs().then((res) => {
    	   	if (res.data) {
    	   		for (let i = 0; i < res.data.length; i++) {
    	   			orgList.push(res.data[i]);
    	   		}
    	   		setOrgs(orgList);
    	   	} else {
    	   		message.error(res.error);
    	   	}
    	});
  	}, []);

	const handleFlip = (id) => {
		// handleFlip code so that cards flip individually rather than all at the same time from 
		// https://stackoverflow.com/questions/71720642/flipping-multiple-cards-in-react-functional-component

    	return (e) => {
    		let flipped = new Set(isFlipped)
    		if (flipped.has(id)) {
      			flipped.delete(id)
      		} else {
        	 	flipped.add(id)
      		}
      		setIsFlipped(flipped)
    	}
	}

	const handleEditOrg = async (event, id) => {
		event.preventDefault();

		if (orgName != '') {
			// find the corresponding org and update its name with the form input
			let updatedOrgs = [...orgs];
			let index = updatedOrgs.findIndex(function (org) {
				return org['id'] == id
			});
			updatedOrgs[index]['name'] = orgName;
			const res = await updateOrgName(id, orgName);
			if (res.data) {
				message.success(
					`Successfully renamed ${orgName}.`
				);
			} else {
				message.error(res.err);
			}
			setOrgs(updatedOrgs);
			setOrgName('');
		} else {
			message.info('Name cannot be blank.');
		}

		// TODO: update when connected to backend to edit db rather than just locally
	}
    
	return (
	    <div className='container nav-padding'>
	        <NavBar />
	        {/* Replace 'Admin' with username after admin accounts are created */}
	        <div id='main-header'>Welcome Admin</div>
	        <div id='page-header'>
	        	<h1>Your Organizations</h1>
	        </div>
	        <div id='orgs-container'>
	        	<div id='dashboard-card-container'>
	        		{orgs.map((org) => (
		        		<div key={org.id} id='dashboard-org-card' className={isFlipped.has(org.id) ? 'flipped' : ''}>
		        			<div className="org-card-front">
				        		<button id='edit-org-btn' onClick={handleFlip(org.id)}>
									<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
									    <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/>
									</svg>
								</button>
			        			<div id='card-top-content-container'>
				        			<h1 id='card-title'>{org.name}</h1>
				        			<p>{org.description}</p>
				        		</div>
				        		<div id='card-bottom-content-container'>
				        			<button className='manage-btn' onClick={() => navigate('/admindashboard')}>
				        				<p>Manage Classrooms</p>
				        			</button>
				        			<div className='divider' />
				        			<button className='manage-btn' onClick={() => navigate('/managegalleries')}>
				        				<p>Manage Galleries</p>
				        			</button>
				        			<div className='divider' />
				        			<button className='manage-btn' onClick={() => navigate('/manageaccount')}>
				        				<p>Manage Accounts</p>
				        			</button>
				        		</div>
				        	</div>
				        	<div className="org-card-back">
				        		<button id='card-back-btn' onClick={handleFlip(org.id)}>
        							<i className='fa fa-arrow-left' aria-hidden='true' />
     							</button>
     							<div id='card-top-content-container'>
     								<form onSubmit={(e) => handleEditOrg(e, org.id)}>
     									<label>Edit Organization Name:</label>
     									<input
     										type='text'
     										placeholder={org.name}
     										value={orgName}
     										onChange={(e) => setOrgName(e.target.value)}
     									/>
     									<button type='submit' className='manage-btn save-btn' onClick={orgName != '' ? handleFlip(org.id) : null}>Save Changes</button>
     								</form>
     								<div className='divider' />
     								<DeleteOrgModal 
     									orgId={org.id}
     									orgName={org.name}
     									orgs={orgs}
     									setOrgs={setOrgs}
     								/>
     							</div>
				        	</div>
		        		</div>
		        	))}
	        	</div>
	        	<input
	        		type='button'
	        		onClick={() => navigate('/createorg')}
	        		value='Create new organization'
	        	/>
	        </div>
	    </div>
    );
}