from django.urls import path
from jobs import views

urlpatterns=[
    path("",views.allJobs,name="all_jobs"),
    path("jobs-by-category/<int:sector>",views.allJobs,name="jobs_by_category"),
    path("job-detail/<int:job_id>",views.jobDetail,name="job_detail"),
    path("add-job",views.addJob,name="add_job"),
    path("update-job/<int:job_id>",views.updateJob,name="update_job")
]