from django.urls import path
from jobs import views

urlpatterns=[
    path("",views.home,name='home'),
    path("all-jobs",views.allJobs,name="all_jobs"),
    path("jobs-by-category/<int:sector>",views.allJobs,name="jobs_by_category"),
    path("job-detail/<int:job_id>",views.jobDetail,name="job_detail"),
    path("add-jobs",views.addJob,name="add_jobs"),
    path("update-job/<int:job_id>",views.updateJob,name="update_job"),
    path('apply-job/<int:job_id>',views.applyJob,name='apply_job'),
    path('login/',views.signIn,name='login'),
    path('register/',views.signUp,name='register'),
    path('logout/',views.signOut,name='logout'),
    path("user-dashboard",views.userDashboard,name="user_dashboard"),
    path("admin-dashboard",views.adminDashboard,name='admin_dashboard'),
    path('edit-profile',views.editProfile,name='edit_profile'),
    path('view-proflie',views.viewProfile,name='view_profile'),
    path("application/<int:application_id>/",views.applicationDetails, name='application_details'),
    path("users/",views.viewUsers,name="view_users"),
    path("admin-job",views.adminJob,name="admin_job"),
]