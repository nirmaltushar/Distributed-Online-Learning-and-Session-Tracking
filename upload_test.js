document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  let em1 = sessionStorage.getItem("emailS");

  try {
    const response = await axios.get("http://localhost:3000/studentdashemail", {
      params: {
        email: em1
      }
    });

    console.log(response.data);

    if (response.data.data && response.data.data.length > 0) {
      const studentData = response.data.data[0];
      const userId = studentData.s_id;

      const profilePic = document.getElementById('profilePic').files[0];

      if (!userId || !profilePic) {
        document.getElementById('message').textContent = 'Please provide User ID and select a file.';
        return;
      }

      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('profilePic', profilePic);

      try {
        const uploadResponse = await fetch('http://localhost:3000/upload-profile-pic', {
          method: 'POST',
          body: formData
        });

        const result = await uploadResponse.json();
        document.getElementById('message').textContent = result.message;

        if (result.success) {
          document.getElementById('message').style.color = 'green';
        } else {
          document.getElementById('message').style.color = 'red';
        }
      } catch (uploadError) {
        console.error('Upload failed:', uploadError);
        document.getElementById('message').textContent = 'An error occurred while uploading.';
        document.getElementById('message').style.color = 'red';
      }
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    document.getElementById('message').textContent = 'Could not fetch user data.';
    document.getElementById('message').style.color = 'red';
  }
});
