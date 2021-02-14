import requests
import numpy as np
import PIL.Image as Image
import io

api_key="AIzaSyAr8OUoyTH5mDIuvnoXTdXHM9i2Jzeo7iU"
base_url="https://maps.googleapis.com/maps/api/staticmap?"

#Provide style here.
style="maptype=roadmap&style=element:labels%7Cvisibility:off&style=feature:administrative.land_parcel%7Cvisibility:off&style=feature:administrative.neighborhood%7Cvisibility:off&style=feature:landscape.man_made%7Celement:geometry%7Ccolor:0xffeb3b&style=feature:landscape.natural%7Celement:geometry%7Ccolor:0xdb8836&style=feature:poi.attraction%7Celement:geometry%7Ccolor:0x808080&style=feature:poi.business%7Celement:geometry%7Ccolor:0x808080&style=feature:poi.government%7Celement:geometry.fill%7Ccolor:0x808080&style=feature:poi.medical%7Celement:geometry%7Ccolor:0xff0000&style=feature:poi.park%7Celement:geometry%7Ccolor:0x00ff00&style=feature:poi.place_of_worship%7Celement:geometry%7Ccolor:0x808080&style=feature:poi.school%7Celement:geometry%7Ccolor:0xffffff&style=feature:poi.sports_complex%7Celement:geometry%7Ccolor:0x808080&style=feature:road.arterial%7Celement:geometry%7Ccolor:0x4636db&style=feature:road.highway%7Celement:geometry%7Ccolor:0xdb3636&style=feature:road.local%7Celement:geometry%7Ccolor:0xf44b89&style=feature:water%7Celement:geometry%7Ccolor:0x21d0e0&size=480x360"



#Constants(DO NOT CHANGE)......................................................................................................
cor_lat,cor_long=23.559819, 87.309379
c_lat,c_long=23.558957, 87.310663

pix2lat=(cor_lat-c_lat)/180
pix2long=(c_long-cor_long)/240

height,width,channel=310,480,3
max_lat_cover=height*pix2lat
max_long_cover=width*pix2long


#CODE...........................................................................................................................
#GoogleMaps request function
def getImage(center, style, zoom=18, image_format="png"):
        r = requests.get(base_url + "key=" + api_key + "&center=" + f"{center[0]},{center[1]}" + \
                         "&zoom=" + str(zoom) + "&format=" + image_format + style)
        content=np.array(Image.open(io.BytesIO(r.content)).convert("RGB"))[25:-25,:,:] 
        #25 px up,down crop due to google logo
        return content

   #CLASS............................................................................................................................... 
#Cordinate class for maintaing lat,longs
class Cordinate:
    def __init__(self,lat,long):
        self.lat=lat
        self.long=long
    def __repr__(self):
        return '<'+str(self.lat)+','+str(self.long)+'>'

#cell class for dividing big task into smallar tasks
class Cell:
    def __init__(self,tl,tr,bl,br):
        self.tl=tl
        self.tr=tr
        self.bl=bl
        self.br=br
        
    def get_Image(self,lat_pad,long_pad,style):
        self.center=Cordinate((self.tl.lat+self.bl.lat)/2,(self.bl.long+self.br.long)/2)
        self.image=getImage((self.center.lat, self.center.long),style)[lat_pad:-lat_pad,long_pad:-long_pad,:]
        
        
    def __repr__(self):
        return self.tl.__repr__()+','+self.tr.__repr__()+'\n'+self.bl.__repr__()+','+self.br.__repr__()

#MOST IMPORTANT FUNCTION.............................................................................................................
#Get Image from top-left and bottom-right corner...function
def Get_Style_Map_Image_Between(top_left_cord=None,bottom_right_cord=None,style=None):
    """
    longitude and latitude must be between -90 to 90.....
    error handling is implemented to catch input error
    """
    top_left=dict(zip(('lat','long'),top_left_cord)) #top_left={'lat':23.560230,'long':87.306205}
    bottom_right=dict(zip(('lat','long'),bottom_right_cord)) #bottom_right={'lat':23.555116,'long':87.312964}
    
    if ((90<top_left['lat'] or top_left['lat']<-90 or 90<top_left['long'] or top_left['long']<-90) or
        (90<bottom_right['lat'] or bottom_right['lat']<-90 or 90<bottom_right['long'] or bottom_right['long']<-90)):
        #checking for input anomlies.................
        raise Exception("Your Input is Out of allowed range..longitude and latitude must be between -90 to 90.....")

    lat_diff=np.abs(top_left['lat']-bottom_right['lat'])
    long_diff=np.abs(bottom_right['long']-top_left['long'])

    num_lat_points=int(np.ceil(lat_diff/max_lat_cover)+1)
    num_long_points=int(np.ceil(long_diff/max_long_cover)+1)
    
    if num_lat_points>10 or num_long_points>10:
        #checking for large input...............to restrice API use.
        raise Exception("Large Input Size....Please stop either your your API usage will be very high")

    lat_axis=np.linspace(top_left['lat'],bottom_right['lat'],num_lat_points)
    long_axis=np.linspace(top_left['long'],bottom_right['long'],num_long_points)

    lat_pad=int(round((height-(lat_axis[0]-lat_axis[1])/pix2lat)/2,ndigits=0))
    long_pad=int(round((width-(long_axis[1]-long_axis[0])/pix2long)/2,ndigits=0))

    LONG,LAT=np.meshgrid(long_axis,lat_axis)
    
    #Map is Cordinates that stores....all lat,long point in the Area of Interest.........
    Map=np.full((num_lat_points,num_long_points),Cordinate(0,0))
    for i in range(num_lat_points):
        for j in range(num_long_points):
            Map[i,j]=Cordinate(LAT[i,j],LONG[i,j])
    
    #Grid is a 2D array of cell objects.....which contains all images for the subtasks.... 
    Grid=np.full((num_lat_points-1,num_long_points-1),Cell(0,0,0,0))
    for i in range(num_lat_points-1):
        for j in range(num_long_points-1):
            tl,tr,bl,br=Map[i,j],Map[i,j+1],Map[i+1,j],Map[i+1,j+1]
            Grid[i,j]=Cell(tl,tr,bl,br)
            Grid[i,j].get_Image(lat_pad,long_pad,style)
    
    #Adding the images sidebyside and upanddown....to form the actual image........
    row=[]
    for i in range(Grid.shape[0]):
        col=[]
        for j in range(Grid.shape[1]):
            col.append(Grid[i,j].image)
        row_image=np.hstack(col)
        row.append(row_image)
    whole_image=np.vstack(row)

    return whole_image #returning the whole image