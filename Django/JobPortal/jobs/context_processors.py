from jobs.models import Sectors,Notification

def allSectors(request):
    all_sectors=Sectors.objects.all()
    return dict(sectors=all_sectors)
